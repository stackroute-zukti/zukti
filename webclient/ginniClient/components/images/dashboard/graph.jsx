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
export default class GraphData extends React.Component {
    constructor(props) {
        super(props);

   }
    render() {
                return (

            <div>
                            <h2>Graphical representation of user result</h2>
                <div>
                    <Card>
                      
                      <PieChart slices={[
                          {
                              color: '#EBEDEF ',
                              value: this.props.totalScore,
                              label:"FLUKE"
                          }, {
                              color: 'red ',
                              value: this.props.score,
                              label:"PercentageFluke"
                          }
                      ]}/>
                        <Card.Content>
                            <Card.Header>
                                Score details {/*
                                                            <br/>  <Button   size='mini' color='#EBEDEF'></Button>   :LeftOutScore
                                                            <br/>   <Button   size='mini' color='red'></Button>  :ObtainedScore 
                               <br/>*/}
                            </Card.Header>
                            <Card.Description > <Icon loading color='blue' name='square'></Icon>
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
                              color: '#EBEDEF ',
                              value: this.props.fluke,
                              label:"FLUKE"
                          }, {
                              color: '#273746 ',
                              value: this.props.percentageFluke,
                              label:"PercentageFluke"
                          }
                      ]}/>
                        <Card.Content>
                            <Card.Header>
                                Fluke details
                            </Card.Header>

                       </Card.Content>
                    </Card>
                </div>

            </div>
        );
    }
}