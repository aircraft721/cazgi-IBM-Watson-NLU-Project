import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    
    render() {
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
          {this.props.confidence && (
                <div className="confidence-wrapper">
                    <div>Confidence</div>
                    <div>{this.props.confidence}</div>
                </div>
            )}
          </div>
          );
        }
    
}
export default EmotionTable;
