import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    
    render() {
        // let emotionClassName = 'emotion-';

        // const { anger, disgust, fear, sadness } = this.props.emotions;

        // if (anger || disgust || fear || sadness) {
        //     emotionClassName += 'sad';
        // } else {
        //     emotionClassName += 'happy';
        // }

      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.emotions).map(([key, value]) => {
                    let classname = 'emotion-';
                    switch (key) {
                        case 'joy':
                            classname += 'happy'
                            break;
                        case 'fear':
                            classname += 'neutral'
                            break;
                        default:
                            classname += 'sad'
                            break;
                    }
                    return (
                        <tr>
                            <th className={classname} scope="row">{key}</th>
                            <td>{value}</td>
                        </tr>
                    )
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
