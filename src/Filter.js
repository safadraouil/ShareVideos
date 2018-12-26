import React from "react";
import "./Datepiker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import PropTypes from "prop-types";

import moment from "moment";

class DatePiker extends React.Component {
  static propTypes = {
    target: PropTypes.string,
    dateFormat: PropTypes.date,
    onDayChange: PropTypes.func
  };
  FORMAT = "YYYY-MM-DD";
  constructor(props) {
    super(props);

    this.state = {
      to: undefined,
      from: undefined
    };
  }
  // change value of date in datepicker
  handleDayChange(date, target) {
    //change format date
    const dateFormat = moment(date).format(this.FORMAT);
    this.setState({ [target]: dateFormat });
    // sent data ((target : to or from ) (date : dateFormat) )to movies ==>
    this.props.handleChangeFilter(target, dateFormat);
  }

  render() {
    return (
      <div>
        {/*if click datepiker from */}
        From: <br />
        <DayPickerInput
          format={this.FORMAT}
          placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
          onDayClick={this.handleDayClick}
          //initialise  onDayChange to sent it to movies(props)
          onDayChange={date => this.handleDayChange(date, "from")}
          selectedDays={"from"}
        />
        {/*if click datepiker to*/}
        <br />
        To: <br />
        <DayPickerInput
          format={this.FORMAT}
          placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
          onDayClick={this.handleDayClick}
          onDayChange={date => this.handleDayChange(date, "to")}
          selectedDays={"to"}
        />
      </div>
    );
  }
}
export default DatePiker;
