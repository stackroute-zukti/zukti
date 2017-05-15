import React from 'react';
import Stat from  './stat';
import Overall from './overall';
import RangeOfDates from './rangeofdates';
import ParticularDate from './particulardate';

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
                    return <Overall totalScore={this.props.totalScore} score={this.props.score}
                    fluke={this.props.fluke} totalQuestions={this.props.totalQuestions} />
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
