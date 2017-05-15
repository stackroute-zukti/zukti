import React from 'react';
import {Line} from 'react-chartjs';
import {Grid,Card,Button,Icon} from 'semantic-ui-react';
import {Bar} from 'react-chartjs';
import PieChart from 'react-simple-pie-chart';
let styles = {
    graphContainer: {
        height: '90px',
        width: '90',
        marginTop: '5px',
        padding: '7px'
    }
};
let chartOptions = {
    bezierCurve: false,
    datasetFill: false,
    pointDotStrokeWidth: 4,
    scaleShowVerticalLines: false,
    responsive: true
};
export default class Overall extends React.Component {
    constructor(props) {
        super(props);

 }
    render() {
                return (

          <div>
                            <h2>Performance of the user from the beginning</h2>
                <div>
                  <Card.Group>
                    <Card>

                    <PieChart slices={[
                          {
                              color: 'purple',
                              value: this.props.totalScore,
                              label:"FLUKE"
                          }, {
                              color: 'red ',
                              value: this.props.score,
                              label:"totalQuestions"
                          }
                      ]}/>
                        <Card.Content>
                            <Card.Header>
                                Score details
                            </Card.Header>
                            <Card.Description > <Icon loading color='purple' name='square'></Icon>
                            :LeftOutScore
                            </Card.Description>
                            <Card.Description> <Icon loading color='red' name='square'></Icon>
                            :ObtainedScore
                            </Card.Description>
                       </Card.Content>
                    </Card>
                    <Card>
                      <PieChart slices={[
                          {
                              color: 'yellow',
                              value: this.props.fluke,
                              label:"FLUKE"
                          }, {
                              color: 'green',
                              value: this.props.totalQuestions,
                              label:"totalQuestions"
                          }
                      ]}/>
                      <Card.Content>
                          <Card.Header>
                              Fluke details
                          </Card.Header>
                          <Card.Description > <Icon loading color='yellow' name='square'></Icon>
                          :Fluke
                          </Card.Description>
                          <Card.Description> <Icon loading color='green' name='square'></Icon>
                          :Attended questions
                          </Card.Description>
                     </Card.Content>
                    </Card>

                 </Card.Group>
                <br/>
                <br/>
                </div>
           </div>
        );
    }
}