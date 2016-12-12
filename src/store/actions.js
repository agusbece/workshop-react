import { browserHistory } from 'react-router';

// Constants
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const GET_TIME_ENTRIES_SUCCESS = 'GET_TIME_ENTRIES_SUCCESS';
export const GET_TIME_ENTRIES_FAILURE = 'GET_TIME_ENTRIES_FAILURE';
export const START_TRACKING_SUCCESS = 'START_TRACKING_SUCCESS';
export const START_TRACKING_FAILURE = 'START_TRACKING_FAILURE';
export const STOP_TRACKING_SUCCESS = 'STOP_TRACKING_SUCCESS';
export const STOP_TRACKING_FAILURE = 'STOP_TRACKING_FAILURE';
export const DELETE_TIME_ENTRY_SUCCESS = 'DELETE_TIME_ENTRY_SUCCESS';
export const DELETE_TIME_ENTRY_FAILURE = 'DELETE_TIME_ENTRY_FAILURE';
export const NEW_TRACKING_SUCCESS = 'NEW_TRACKING_SUCCESS';
export const NEW_TRACKING_FAILURE = 'NEW_TRACKING_FAILURE';  
export const EDIT_TRACKING_SUCCESS = 'EDIT_TRACKING_SUCCESS'; 
export const EDIT_TRACKING_FAILURE = 'EDIT_TRACKING_FAILURE'; 

// Action creators
export const signUp = (email) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/users/signup', {
        method: 'POST',
        body: JSON.stringify({email})
      }
    )
    .then(data => data.json())
    .then(
      data => dispatch({ type: SIGN_IN_SUCCESS, data }),
      err => dispatch({ type: SIGN_IN_FAILURE, err })
    )
    .then(() => { browserHistory.push('/dashboard'); });
  }
}

export const logOut = () => {
  browserHistory.push('/login');
  return { type: LOGOUT }
}

export const getTimeEntries = () => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries?user_id=' + getState().user.id)
    .then(data => data.json())
    .then(
      data => dispatch({ type: GET_TIME_ENTRIES_SUCCESS, data }),
      err => dispatch({ type: GET_TIME_ENTRIES_FAILURE, err })
    );
  }
}

export const startTracking = (title, timeStart) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries', {
      method: 'POST',
      body: JSON.stringify({
        title,
        user_id: getState().user.id,
        time_start: timeStart
      })
    })
    .then(data => data.json())
    .then(
      data => dispatch({ type: START_TRACKING_SUCCESS, data }),
      err => dispatch({ type: START_TRACKING_FAILURE, err })
    );
  };
};

export const stopTracking = (title, timeEnd) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries/' + getState().currentTrack.id, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        user_id: getState().user.id,
        time_end: timeEnd
      })
    })
    .then(data => data.json())
    .then(
      data => dispatch({ type: STOP_TRACKING_SUCCESS, data }),
      err => dispatch({ type: STOP_TRACKING_FAILURE, err })
    );
  };
};

export const editTracking = (id, title, timeStart, timeEnd) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        user_id: getState().user.id,
        time_start: timeStart,
        time_end: timeEnd
      })
    })
    .then(data => data.json())
    .then(
      data => dispatch({ type: EDIT_TRACKING_SUCCESS, data }),
      err => dispatch({ type: EDIT_TRACKING_FAILURE, err })
    );
  };
};

export const deleteTimeEntry = (id) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries/' + id, {
      method: 'DELETE'
    })
    .then(data => null )
    .then(
      data => dispatch({ type: DELETE_TIME_ENTRY_SUCCESS, id }),
      err => dispatch({ type: DELETE_TIME_ENTRY_FAILURE, err })
    );
  };
};

export const createCustomTrack = (title, timeStart, timeEnd) => {
  return (dispatch, getState) => {
    fetch(API_URL + '/time_entries', {
      method: 'POST',
      body: JSON.stringify({
        title,
        user_id: getState().user.id,
        time_start: timeStart,
        time_end: timeEnd
      })
    })
    .then(data => data.json())
    .then(
      data => dispatch({ type: NEW_TRACKING_SUCCESS, data }),
      err => dispatch({ type: NEW_TRACKING_FAILURE, err })
    );
  };
};

export default {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
  GET_TIME_ENTRIES_SUCCESS,
  GET_TIME_ENTRIES_FAILURE,
  START_TRACKING_SUCCESS,
  START_TRACKING_FAILURE,
  STOP_TRACKING_SUCCESS,
  STOP_TRACKING_FAILURE,
  DELETE_TIME_ENTRY_SUCCESS,
  DELETE_TIME_ENTRY_FAILURE,
  NEW_TRACKING_SUCCESS,
  NEW_TRACKING_FAILURE,
  EDIT_TRACKING_SUCCESS,
  EDIT_TRACKING_FAILURE
};
