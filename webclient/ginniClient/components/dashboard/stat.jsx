import React from 'react';
import {Statistic} from 'semantic-ui-react';

export default class Stat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
            <Statistic.Group>
            <Statistic color='red' value={this.props.rank} label='Rank' />
            <Statistic color='blue' value={this.props.score} label='Score' />
            <Statistic color='green' value={this.props.totalQuestions} label='Total questions attempted' />
            <Statistic color='orange' value={this.props.fluke} label='No of Hit & Tries' />
            <Statistic color='blue' value={this.props.percentageFluke} label='Percentage Guess' />
            </Statistic.Group>
            </div>
        );
    }
}