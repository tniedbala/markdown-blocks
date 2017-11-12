const layout = {
  editmode: true,
  collapse: false,
  split: {
    height: 0,
    ratio: 0.5
  }
}

export default function reducer(state=layout, action) {  
  var newState = Object.assign({}, state);
  var split = newState.split;
  
  switch(action.type) {

    case 'TOGGLE_STATE':
      newState.showstate = !newState.showstate;
      return newState;

    case 'TOGGLE_EDITMODE':
      //alert('test');
      newState.editmode = !state.editmode;
      return newState;

    case 'TOGGLE_EDITOR':
      newState.collapse = !newState.collapse;
      return newState;

    case 'OPEN_SETTINGS':
      alert(action.type);
      return newState;

    case 'MOVE_PARTITION':
      let { height, ratio } = action;
      split.height = height;
      split.ratio = ratio;
      newState.split = split;
      return newState;

    default:
      return newState;
  }
}