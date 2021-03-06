const layout = {
  editmode: true,
  follow: 'active',
  scroll: true,
  split: {
    collapse: false,
    resize: false,
    height: 0,
    ratio: 0.5
  }
}

export default function reducer(state=layout, action) {  
  
  var newState = Object.assign({}, state);
  var { split } = newState;
  
  switch(action.type) {

    case 'FOLLOW':
      newState.follow = action.anchor;
      return newState;

    case 'TOGGLE_STATE':
      newState.showstate = !newState.showstate;
      return newState;

    case 'TOGGLE_EDITMODE':
      newState.editmode = !state.editmode;
      return newState;

    case 'TOGGLE_EDITOR':
      newState.split.collapse = !split.collapse;
      return newState;

    case 'TOGGLE_RESIZE':
      newState.split.resize = action.resize
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
    
    case 'MOVE_BLOCK':
      newState.follow = action.id;
      return newState;      

    case 'SCROLL_BLOCK':
      newState.scroll = action.scroll;
      return newState;

    default:
      return newState;
  }
}