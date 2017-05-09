import React from 'react';
import Stat from  './stat';
import GraphData from './graph';
import Followers from './followers';
import Following from './Following';

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
            case 'Graph':
                {
                    return <GraphData totalScore={this.props.totalScore} score={this.props.score}
                    fluke={this.props.fluke} percentageFluke={this.props.percentageFluke} /> ;
                }
            case 'Followers':
                            {
                                return <Followers /> ;
                            }
                        case 'Following':
                            {
                                return <Following /> ;
                            }
        }
    }
}
