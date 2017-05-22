import React from 'react';
import Stat from  './stat';
import Overall from './overall';
import Overall2 from './overall2';
import RangeOfDates from './rangeofdates';
import ParticularDate from './particulardate';
import {Card} from 'semantic-ui-react';


export default class DashboardContent extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {

        switch (this.props.item) {
            case 'Stat':
                {
                    return <Stat rank={this.props.rank} score={this.props.score}
                    totalQuestions={this.props.totalQuestions} fluke={this.props.fluke} percentageFluke={this.props.percentageFluke} /> ;
                }
            case 'Overall':
                {
                    return (
                <Card.Group>
                <Card>
                  <Card.Content>
                <Overall slice1={this.props.totalScore} slice2={this.props.score}
                 />
                </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                <Overall2
                slice1={this.props.totalQuestions} slice2={this.props.fluke} />
                </Card.Content>
                </Card>
                </Card.Group>
                );
                }
            case 'RangeOfDates':
                {
                    return <RangeOfDates />
                }
            case 'ParticularDate':
                {
                    return <ParticularDate />
                }
        }
    }
}
