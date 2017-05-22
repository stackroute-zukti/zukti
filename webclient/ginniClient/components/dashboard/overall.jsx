//import '../../Assessment.css'
import React, {Component} from "react"
import PieChart from "react-svg-piechart"

export default class Overall extends React.Component {
    constructor() {
        super()

        this.state = {
            expandedSector: null,
        }

        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
    }

    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }

    render() {
        let slice1 = this.props.slice1;
        let slice2 = this.props.slice2;
        const data = [
            {label: "Total score", value: slice1, color: "#1589ff"},
            {label: "Obtained score", value: slice2, color: "#43c6db"}
        ]

        const {expandedSector} = this.state

        return (
            <div className="chart">
                <PieChart
                    data={ data }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    sectorStrokeWidth={2}
                    expandOnHover
                />
							<div className="text">
                {
                    data.map((element, i) => (
                        <div key={i}>
                            <span style={{background: element.color}}></span>
                            <span style={{color: this.state.expandedSector === i ? element.color : null}}>
                                {element.label} : {element.value}
                            </span>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}
