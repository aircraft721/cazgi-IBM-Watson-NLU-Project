const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

async function getNLUInstance(data) {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const NLU = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    })

    let response = await NLU.analyze(data)
    .then(analysisResults => {
        return JSON.stringify(analysisResults, null, 2);
    })
    .catch(err => {
        return 'error:', err;
    });

    return response;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});

app.get("/url/emotion", async (req,res) => {
    const analyzeParams = {
         'url': req.query.url,
            'features': {
                'entities': {
                'emotion': true,
                'sentiment': false,
                'limit': 1,
                },
                'keywords': {
                'emotion': true,
                'sentiment': false,
                'limit': 1,
                },
            },
    }

    const emotionData = await getNLUInstance(analyzeParams);
    return res.send(emotionData);
});

app.get("/url/sentiment", async (req,res) => {
        const analyzeParams = {
         'url': req.query.url,
            'features': {
                'entities': {
                'emotion': false,
                'sentiment': true,
                'limit': 1,
                },
                'keywords': {
                'emotion': false,
                'sentiment': true,
                'limit': 1,
                },
            },
    }

    const sentimentData = await getNLUInstance(analyzeParams);
    return res.send(sentimentData);
});

app.get("/text/emotion", async (req,res) => {
    let dataArray = req.query.text.split(" ");

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'targets': dataArray
            }
        },
        'language': 'en'
    };

    const emotionData = await getNLUInstance(analyzeParams);
    return res.send(emotionData);
});

app.get("/text/sentiment", async (req,res) => {
    let dataArray = req.query.text.split(" ");

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'targets': dataArray
            }
        },
        'language': 'en'
    };

    const sentiment = await getNLUInstance(analyzeParams);
    return res.send(sentiment);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

