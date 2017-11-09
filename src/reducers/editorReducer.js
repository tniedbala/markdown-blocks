const editor = {
  //content: '# Sed ut Perspiciatis\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  content: '',
  cache: ''
}

export default function reducer(state=editor, action) {  
  var newState = Object.assign({}, state);
  
  switch(action.type) {

    case 'OPEN_FILE':
      newState.content = action.content;
      return newState;

    case 'EDITOR_CHANGE':
      newState.content = action.data;
      return newState;

    case 'EDIT_BLOCK':
      newState.content = action.content;
      newState.cache = newState.content;
      return newState;

    case 'PUBLISH_BLOCK':
    case 'CANCEL_BLOCK':
      newState.content = '';
      newState.cache = '';
      return newState;

    default:
      return newState;
  }
}