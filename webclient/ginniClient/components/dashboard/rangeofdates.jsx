import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Calendar,DateRange  } from 'react-date-range';

export default class RangeOfDates extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            startDate:moment(),
            endDate:moment()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = function handleChange(selectedDate) {
        this.setState({startDate:selectedDate._d,endDate:selectedDate.endDate._d})
    }

    render() {
        return(
            <div>
                <DateRange
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
