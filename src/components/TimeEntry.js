import React, { Component } from 'react';
import { connect } from 'react-redux';
import Octicon from 'react-octicon';
import { deleteTimeEntry, editTracking } from '../store/actions';
import './TimeEntry.scss';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class TimeEntry extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      trackTitle: this.props.title,
      trackStartTime: this.renderDateForModal(this.props.timeStart),
      trackEndTime: this.renderDateForModal(this.props.timeEnd)
    };

    this.deleteEntry = ::this.deleteEntry;
    this.openModal  = ::this.openModal;
    this.closeModal = ::this.closeModal;
    this.editEntry   = ::this.editEntry; 
    this.handleChangeEndInput   = ::this.handleChangeEndInput;
    this.handleChangeStartInput = ::this.handleChangeStartInput;
    this.handleChangeTitleInput = ::this.handleChangeTitleInput;
  }

  renderDate (dateString) {
    const date = new Date(dateString);
    var hours = '';
    var minutes = '';
    if (date.getHours() < 10) {
      hours = '0' + date.getHours();
    } else {      
      hours = date.getHours();
    }    
    if (date.getMinutes() < 10) {
      minutes = '0' + date.getMinutes();
    } else {      
      minutes = date.getMinutes();
    }    
    return hours + ':' + minutes;
  }
  
  renderDateForModal (dateString) {
    const date = new Date(dateString);
    console.log (dateString);
    //var year = date.getYear() + 1900;
    var year = date.getFullYear();
    var month = '';
    var day = '';
    var hours = '';
    var minutes = '';
    if (date.getMonth() < 10) {
      month = '0' + (date.getMonth() + 1 );
    } else {      
      month = (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
      day = '0' + date.getDate();
    } else {      
      day = date.getDate();
    }    
    if (date.getHours() < 10) {
      hours = '0' + date.getHours();
    } else {      
      hours = date.getHours();
    }    
    if (date.getMinutes() < 10) {
      minutes = '0' + date.getMinutes();
    } else {      
      minutes = date.getMinutes();
    }    
    return year + '-' + month + '-' + day + 'T' +
      hours + ':' + minutes;
  }

  deleteEntry () {
    this.props.deleteTimeEntry(this.props.id);  
  }

// modal add track
  openModal () {
    this.setState({modalIsOpen: true});
  }

  closeModal () {
    this.setState({
      modalIsOpen: false,
      trackStartTime: this.renderDateForModal(this.props.timeStart),
      trackEndTime: this.renderDateForModal(this.props.timeEnd),
      trackTitle: this.props.title});
  }

  editEntry () {
    if ((this.state.trackStartTime != '') && (this.state.trackEndTime != '') 
          && (this.state.trackTitle != '')){
      this.setState({modalIsOpen: false}); 
      this.props.editTracking(this.props.id, this.state.trackTitle, 
                                this.state.trackStartTime + '-03:00', 
                                this.state.trackEndTime + '-03:00');    
    } 
  }

  handleChangeTitleInput (event) {
    this.setState({trackTitle: event.target.value});
  }

  handleChangeStartInput (event) {
    this.setState({trackStartTime: event.target.value});
  }

  handleChangeEndInput (event) {
    this.setState({trackEndTime: event.target.value});
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
        <button className='modify-entry' onClick={this.openModal}>Edit</button>
        <button className='delete-entry' onClick={this.deleteEntry}>Delete</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <form>
            <p>Title</p>
            <input  type='text' value={this.state.trackTitle} onChange={this.handleChangeTitleInput} />
          </form>
          <div>  
            <form>          
              <p>Starts at</p>
              <input type="datetime-local" value={this.state.trackStartTime} onChange={this.handleChangeStartInput} />
            </form>   
            <form>
              <p>Ends at</p>
              <input type="datetime-local" value={this.state.trackEndTime} onChange={this.handleChangeEndInput}  />
            </form>
          </div>
          <div>     
            <button onClick={this.closeModal}>Cancel</button>
            <button onClick={this.editEntry}>Save</button>
          </div>          
        </Modal>

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

const mapActionCreators = { deleteTimeEntry, editTracking };

export default connect(null, mapActionCreators)(TimeEntry);
