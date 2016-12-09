import React, { Component } from 'react';
import { connect } from 'react-redux';
import secToMin from 'sec-to-min';
import moment from 'moment';
import { startTracking, stopTracking } from '../store/actions';
import './TimeTracker.scss';

class TimeTracker extends Component {
  constructor (props) {
    super(props);

    this.state = { running: false, timer: 0 };

    this.toggleTimer = ::this.toggleTimer;
  }

  toggleTimer () {
    if (this.state.running) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer () {
    this.setState({ running: true });

    this.props.startTracking(this.trackInput.value, moment().format());

    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, 1000);
  }

  stopTimer () {
    this.setState({ running: false, timer: 0 });

    this.props.stopTracking(this.trackInput.value, moment().format());
    this.trackInput.value = '';

    clearInterval(this.timerInterval);
  }

  render () {
    const { running, timer } = this.state;
    const buttonText = running ? 'Stop' : 'Start';

    return (
      <div className='time-tracker'>
        <input type='text' ref={(input) => { this.trackInput = input; }} />
        <div>{secToMin(timer)}</div>
        <button onClick={this.toggleTimer}>{buttonText}</button>
        
      </div>
    );
  }
};

TimeTracker.propTypes = {
  startTracking: React.PropTypes.func.isRequired,
  stopTracking: React.PropTypes.func.isRequired 
};

const mapActionCreators = { startTracking, stopTracking };

export default connect(null, mapActionCreators)(TimeTracker);
