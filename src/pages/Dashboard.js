import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeTracker from '../components/TimeTracker';
import TimeEntry from '../components/TimeEntry';
import { getTimeEntries, logOut } from '../store/actions';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor (props) {
    super(props);

    this.logOut = ::this.logOut;
  }


  componentWillMount () {
    this.props.getTimeEntries();
  }

  renderEmptyMessage () {
    return <li className='dashboard-list-zero-state'>You dont have any tracks.</li>;
  }

  logOut () {
    this.props.logOut();
  }

  render () {
    const tracks = this.props.tracks.map((track) => (
      <TimeEntry
        key={track.id}
        id={track.id}
        title={track.title}
        timeStart={track.time_start}
        timeEnd={track.time_end} />
    ));

    return (
      <section className='dashboard'>

        <div className='dashboard__hero'>
          <div>     
            <button className='button-logout' onClick={this.logOut} >Logout</button>  
          </div>
          <h2>Start tracking!</h2>
          <TimeTracker />
        </div>
        
        <div className='dashboard__list'>
          <h3>My tracks</h3>
          <ul>
            { tracks.length > 0 ? tracks : this.renderEmptyMessage() }
          </ul>
        </div>
      </section>
    );
  }
};

Dashboard.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  getTimeEntries: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ tracks: state.tracks });
const mapActionCreators = { getTimeEntries, logOut };

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
