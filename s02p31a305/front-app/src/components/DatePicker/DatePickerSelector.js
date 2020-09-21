import React from "react";
import moment from 'moment';
import './DatePicker.scss';

class DatePickerSelector extends React.Component {
  state = {
    tempValue: this.props.value
  };
  
  clickPreviousMonth = () => {
    this.setState({
      tempValue: moment(this.state.tempValue).subtract(1, 'month').toDate()
    })
  };

  clickNextMonth = () => {
    this.setState({
      tempValue: moment(this.state.tempValue).add(1, 'month').toDate()
    })
  };

  clickDay = (e) => {
    let oldDate = this.state.tempValue;
    let dataDate = e.currentTarget.getAttribute('data-day');
    let dataMonth = e.currentTarget.getAttribute('data-month');
    let newDate = moment(oldDate).month(dataMonth).date(dataDate).toDate();
    
    this.setState({
      tempValue: newDate
    });
    
    if (this.props.onChangeDate)
      this.props.onChangeDate(oldDate, newDate);
  
    
    if (this.props.hideSelector)
      this.props.hideSelector();
  };

  renderDaysInMonth() {
    let { value } = this.props;
    let selectedDate = moment(value);
    let selectedTempDate = moment(this.state.tempValue);
    let startDate = moment(this.state.tempValue).date(1);
    
    if (startDate.days() !== 0)
      startDate.subtract(startDate.days(), 'days');
    
    let rows = [];
    let daysIndex = 0;
    
    for (var j = 0; j < 6; j++) {
      let row = [];
      
      for (var i = 0; i < 7; i++) {
        let className = 'datePickerSelectorTableDays';
        
        if (startDate.month() !== selectedTempDate.month())
          className += 'NotInMonth';
        else if (startDate.date() === selectedDate.date() && startDate.month() === selectedDate.month())
          className += 'Selected';
        
        row.push(
          <td 
            key={startDate.date()} 
            onClick={this.clickDay}
            className={className} 
            data-day={startDate.date()} 
            data-month={startDate.month()}
            >
            {startDate.date()}
          </td>
        );
        
        startDate.add(1, 'days');
      }
      
      rows.push(row);
      daysIndex++;
    }
    
    return rows.map((row, i) => {
      return (
        <tr key={i}>
          {row.map((item) => {
            return item;
          })}
        </tr>
      );
    });
  }
  
  render = () => {
    let datePickerSelectorClassName = 'datePickerSelector';
    
    if (this.props.isSelectorActive)
      datePickerSelectorClassName += ' active';
    
    return (
      <div className={datePickerSelectorClassName}>
        <table className="datePickerSelectorTable">
          <tbody>
            <tr className="datePickerSelectorTableHeader">
              <td onClick={ this.clickPreviousMonth }>
                <svg className="datePickerSelectorTableHeaderPreviousMonth svg-icon" viewBox="0 0 20 20">
                  <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                </svg>
              </td>
              <td className="datePickerSelectorTableHeaderCurrentMonth" colSpan="5">
              {moment(this.state.tempValue).format("MMMM YYYY")}
              </td>
              <td onClick={ this.clickNextMonth }>
                <svg className="datePickerSelectorTableHeaderNextMonth svg-icon" viewBox="0 0 20 20">
                  <path fill="none" d="m11.676108,10.049228l-4.76,-4.873c-0.303,-0.31 -0.297,-0.804 0.012,-1.105c0.309,-0.304 0.803,-0.293 1.105,0.012l5.306,5.433c0.304,0.31 0.296,0.805 -0.012,1.105l-5.432,5.307c-0.152,0.148 -0.35,0.223 -0.547,0.223c-0.203,0 -0.406,-0.08 -0.559,-0.236c-0.303,-0.309 -0.295,-0.803 0.012,-1.104l4.875,-4.762z"></path>
                </svg>
              </td>
            </tr>
            <tr className="datePickerSelectorTableDaysHeader">
              <td>Mo</td>
              <td>Tu</td>
              <td>We</td>
              <td>Th</td>
              <td>Fr</td>
              <td>Sa</td>
              <td>Su</td>
            </tr>
            { this.renderDaysInMonth() }
          </tbody>
        </table>
      </div>
    );
  };
}

export default DatePickerSelector;