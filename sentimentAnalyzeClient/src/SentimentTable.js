import React from 'react';
import './bootstrap.min.css';

class SentimentTable extends React.Component {
    
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.sentiments).map(([key, value]) => {
                    let classname = 'sentiment-';

                    switch (value) {
                        case 'positive':
                            classname += 'positive'
                            break;
                        case 'negative':
                            classname += 'negative'
                            break;
                        default:
                            classname += 'meh'
                            break;
                    }
                    return (
                        <tr>
                            <th scope="row">{key}</th>
                            <td className={key === 'label' && classname}>{value}</td>
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
export default SentimentTable;
