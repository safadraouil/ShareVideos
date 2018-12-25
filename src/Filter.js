import React from "react";
import "./Datepiker.css";
//import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";

import moment from "moment";

class DatePiker extends React.Component {
  FORMAT = "YYYY-DD-MM";
  constructor(props) {
    super(props);

    this.state = {
      to: undefined,
      from: undefined,

      visible: true
    };
  }

  handleDayChange(date, target) {
    console.log("+++++", date);
    console.log(target);
    const dateFormat = moment(date).format(this.FORMAT);
    this.setState({ [target]: dateFormat });

    this.props.handleChangeFilter(target, dateFormat);
  }

  /*handleDayChangeTo = day => {
    this.setState({
      to: moment(day).format("YYYY/DD/MM")
    });

    this.props.handleChangeFilter(moment(day).format("YYYY/DD/MM"));
  };*/
  render() {
    return (
      <div>
        <DayPickerInput
          format={this.FORMAT}
          placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
          onDayClick={this.handleDayClick}
          onDayChange={date => this.handleDayChange(date, "from")}
          selectedDays={"from"}
        />

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
