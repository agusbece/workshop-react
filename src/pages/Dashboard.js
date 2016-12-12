import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeTracker from '../components/TimeTracker';
import TimeEntry from '../components/TimeEntry';
import { getTimeEntries, logOut, createCustomTrack } from '../store/actions';
import './Dashboard.scss';
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

class Dashboard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      trackStartTime: '',
      trackEndTime: '',
      trackTitle: ''
    };

    this.openModal  = ::this.openModal;
    this.closeModal = ::this.closeModal;
    this.addEntry   = ::this.addEntry; 
    this.handleChangeEndInput   = ::this.handleChangeEndInput;
    this.handleChangeStartInput = ::this.handleChangeStartInput;
    this.handleChangeTitleInput = ::this.handleChangeTitleInput;
  }

  componentWillMount () {
    this.props.getTimeEntries();
  }

  renderEmptyMessage () {
    return <li className='dashboard-list-zero-state'>You dont have any tracks.</li>;
  }

  // modal add track
  openModal () {
    this.setState({modalIsOpen: true});
  }

  closeModal () {
    this.setState({modalIsOpen: false});
    this.setState({trackStartTime: ''});
    this.setState({trackEndTime: ''});
    this.setState({trackTitle: ''});
  }

  addEntry () {
    //console.log(this.state.trackStartTime); 
    if ((this.state.trackStartTime != '') && (this.state.trackEndTime != '') 
          && (this.state.trackTitle != '')){
      this.setState({modalIsOpen: false}); 
      this.props.createCustomTrack( this.state.trackTitle, 
        this.state.trackStartTime + '-03:00', this.state.trackEndTime + '-03:00');            
      this.setState({trackStartTime: ''});
      this.setState({trackEndTime: ''});
      this.setState({trackTitle: ''});
    } 
  }

  handleChangeTitleInput (event) {
    this.setState({trackTitle: event.target.value});
  }

  handleChangeStartInput (event) {
    this.setState({trackStartTime: event.target.value});
    console.log(this.state.trackStartTime); 
  }

  handleChangeEndInput (event) {
    this.setState({trackEndTime: event.target.value});
    console.log(this.state.trackEndTime); 
  }

  render () {
    const tracks = this.props.tracks.map((track) => (
      <TimeEntry
        key={track.id}
        id={track.id}
        title={track.title}
        timeStart={track.time_start}
        timeEnd={track.time_end}
        tracks={this.props.tracks} />
    ));

    return (
      <section className='dashboard'>
        <div className='dashboard__hero'>
          <div>     
            <button className='button-logout' onClick={this.props.logOut} >Logout</button>  
          </div>
          <h2>Start tracking!</h2>
          <TimeTracker />
          <div>
            <button className='add_entry' onClick={this.openModal}>Custom track</button>            
          </div>
        </div>        
        <div className='dashboard__list'>
          <h3>My tracks</h3>
          <ul>
            { tracks.length > 0 ? tracks : this.renderEmptyMessage() }
          </ul>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form>
            <p>Title</p>
            <input  type='text'  value={this.state.trackTitle} onChange={this.handleChangeTitleInput} />
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
            <button onClick={this.addEntry}>Save</button>
          </div>          
        </Modal>

      </section>
    );
  }
};

Dashboard.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  getTimeEntries: React.PropTypes.func.isRequired,
  createCustomTrack: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ tracks: state.tracks });
const mapActionCreators = { getTimeEntries, logOut, createCustomTrack };

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
