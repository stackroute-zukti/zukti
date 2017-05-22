//import '../../Assessment.css'
import React, {Component} from "react"
import PieChart from "react-svg-piechart"

export default class ResultPie extends React.Component {
    constructor() {
        super()

        this.state = {
            expandedSector: null
        }

        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
    }

    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }

    render() {
        var tries1 = 0;
        let tries2 = 0;
        let tries3 = 0;
        let tries4 = 0;
        if (this.props.tries[1])
            tries1 = this.props.tries[1];
        if (this.props.tries[2])
            tries2 = this.props.tries[2];
        if (this.props.tries[3])
            tries3 = this.props.tries[3];
        if (this.props.tries[4])
            tries4 = this.props.tries[4];
        const data = [
            {
                label: "1st try",
                value: tries1,
                color: "#3b5998"
            }, {
                label: "2nd try",
                value: tries2,
                color: "#00aced"
            }, {
                label: "3rd try",
                value: tries3,
                color: "#cb2027"
            }, {
                label: "4th try",
                value: tries4,
                color: "#007bb6"
            }
        ]

        const {expandedSector} = this.state

        return (
            <div className="chart">
                <PieChart data={data} expandedSector={expandedSector} onSectorHover={this.handleMouseEnterOnSector} sectorStrokeWidth={2} expandOnHover/>
                <div className="text">
                    {data.map((element, i) => (
                        <div key={i}>
                            <span style={{
                                background: element.color
                            }}></span>
                            <span style={{
                                color: this.state.expandedSector === i
                                    ? element.color
                                    : null
                            }}>
                                {element.label}
                                : {element.value}
                            </span>
                        </div>
                    ))
}
                </div>
            </div>
        )
    }
}
