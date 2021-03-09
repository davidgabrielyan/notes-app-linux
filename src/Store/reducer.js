const initialState = {
  page: 'notes',
  notes: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  state = { ...state };
  switch(type) {
    case 'page-changed':
      state.page = payload.value;
      break;
    case 'notes-updated':
      state.notes = payload.notes;
      break;
    case 'update-notes':
      state.notes = payload.notes.reverse();
      break;
    default:
      break;
  }
  return state;
}

export default reducer;