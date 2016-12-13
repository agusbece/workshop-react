import actions from './actions';

// Action handlers
const ACTION_HANDLERS = {
  [actions.SIGN_IN_SUCCESS]: (state, action) => {
    return { ...state, user: action.data.user };
  },
<<<<<<< HEAD
=======
  [actions.LOGOUT]: (state, action) => {
    return { 
      ...state, 
      user: null,
      tracks: [],
      currentTrack: null
    };
  },
>>>>>>> my-work
  [actions.GET_TIME_ENTRIES_SUCCESS]: (state, action) => {
    return { ...state, tracks: action.data.time_entries };
  },
  [actions.START_TRACKING_SUCCESS]: (state, action) => {
    return { ...state, currentTrack: action.data.time_entry };
  },
  [actions.STOP_TRACKING_SUCCESS]: (state, action) => {
    return {
      ...state,
      tracks: state.tracks.concat([action.data.time_entry]),
      currentTrack: null
    };
<<<<<<< HEAD
  }
};

=======
  },
  [actions.DELETE_TIME_ENTRY_SUCCESS]: (state, action) => {
    return {
      ...state,
      tracks: state.tracks.filter(track => track.id !== action.id)
    }; 
  },
  [actions.NEW_TRACKING_SUCCESS]: (state, action) => {
    return {
      ...state,
      tracks: state.tracks.concat([action.data.time_entry])
    };
  },
  [actions.EDIT_TRACKING_SUCCESS]: (state, action) => {
    var index = state.tracks.findIndex(track => track.id == action.data.time_entry.id);
    return {
      ...state,

      tracks: state.tracks.slice(0, index)
              .concat(action.data.time_entry)
              .concat(state.tracks.slice(index + 1))
      //tracks: trackFiltered.concat([action.data.time_entry])
      //tracks: state.tracks.filter(track => track.id !== action.id),
      //tracks: state.tracks.concat([action.data.time_entry])
      /*
  
   ...list.slice(0,index)
              .concat(list[index] + 1)
              .concat(list.slice(index + 1))

      */
    };
  }
};


>>>>>>> my-work
// Reducer
export const initialState = {
  user: null,
  tracks: [],
  currentTrack: null
};

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
