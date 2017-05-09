import React from 'react';

export default class Stat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
            <h1>Stat Segment</h1>
            <h2>rank:{this.props.rank}</h2>
            <h2>score:{this.props.score}</h2>
            <h2>totalQuestions attended:{this.props.totalQuestions}</h2>
            <h2>Guessed answers:{this.props.fluke}</h2>
            <h2>Fluke percentage: {this.props.percentageFluke}</h2>
            </div>
        );
    }
}