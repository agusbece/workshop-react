import React, { Component } from 'react';
import { connect } from 'react-redux';
import Octicon from 'react-octicon';
import { deleteTimeEntry } from '../store/actions';
import './TimeEntry.scss';

class TimeEntry extends Component {
  constructor (props) {
    super(props);

    this.deleteEntry = ::this.deleteEntry;
  }

  renderDate (dateString) {
    const date = new Date(dateString);
    return date.getHours() + ':' + date.getMinutes();
  }

  deleteEntry () {
    this.props.deleteTimeEntry(this.props.id);  
  }

  render () {
    const {id, title, timeStart, timeEnd} = this.props;

    return (
      <li className='time-entry'>
        <Octicon name='triangle-right' />
        <p contentEditable>{title}</p>
        <div className='time-entry__start'>
          { timeStart ? this.renderDate(timeStart) : '-:-' }
        </div>
        <div className='time-entry__end'>
          { timeEnd ? this.renderDate(timeEnd) : '-:-' }
        </div>
        <Octicon name='x' />      
        
        <button className='delete-entry' onClick={this.deleteEntry}>Delete</button>       

      </li>
    );
  }
};

TimeEntry.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  timeStart: React.PropTypes.string,
  timeEnd: React.PropTypes.string
};

const mapActionCreators = { deleteTimeEntry };

export default connect(null, mapActionCreators)(TimeEntry);
