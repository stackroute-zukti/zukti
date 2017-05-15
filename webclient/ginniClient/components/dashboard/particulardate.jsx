import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Calendar,DateRange  } from 'react-date-range';
import PerformanceChart from './singledategraphs/performancechart';

export default class ParticularDate extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            date:moment()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = function handleChange(selectedDate) {
        // console.log('moment whole',moment().format('h:mm:ss a') );
        // console.log('moment date',this.state.date);
        this.setState({date:selectedDate._d})
      // console.log(selectedDate._d);
    }

    render() {
        return(
            <div>
                <div>
                    <Calendar
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <PerformanceChart />
                </div>
            </div>
        );
    }
}
