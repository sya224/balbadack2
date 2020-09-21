import React from "react";
import './DatePicker.scss';
import DatePickerLabel from './DatePickerLabel.js'
import DatePickerSelector from './DatePickerSelector.js'


class DatePicker extends React.Component {
  state = {
    value: this.props.value,
    isSelectorActive: false,
  };

  onChangeDate = (oldDate, newDate) => {
    if (oldDate !== newDate) {
      this.setState({
        value: newDate
      });
    }
  };

  onChangeShowSelector = (value) => {
    this.setState({
      isSelectorActive: value
    });
  };
  
  toggleSelector = () => {
    this.onChangeShowSelector(!this.state.isSelectorActive);
  };

  showSelector = () => {
    this.onChangeShowSelector(true);
  };

  hideSelector = () => {
    this.onChangeShowSelector(false);
  };

  render() {
    let { value, isSelectorActive } = this.state;
    let { onChangeDate, showSelector, hideSelector, toggleSelector } = this;
    let childProps = { value, isSelectorActive, onChangeDate, showSelector, hideSelector, toggleSelector };
    
    return (
      <div className="datePicker">
        <DatePickerLabel { ...childProps } />
        <DatePickerSelector { ...childProps } />
      </div>
    );
  }
}


export default DatePicker;