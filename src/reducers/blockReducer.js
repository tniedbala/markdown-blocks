import { pullAt } from 'lodash';

// delete block.follow
function deleteFollow(newState) {
  return newState.map(block => {
    if(block.follow) {
      delete block.follow;
    }
    return block;
  });
}

// default state
const blockset =  [
  {
    id: Date.now(),
    content: ''
  },
  {
    id: Date.now() + 1,
    content: '# Lorem Ipsum\n<hr/>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: Date.now() + 2,
    content: "## Sed ut perspiciatis\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    id: Date.now() + 3,
    content: "## At vero\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  {
    id: 'active',
    follow: true
  }
]


export default function reducer(state=blockset, action) {
  var newState = [ ...state],
      i = newState.findIndex(obj => obj.id === action.id), // block index
      a = newState.findIndex(obj => obj.id === 'active'); // active block index
  
  switch(action.type) {

    case 'ADD_BLOCK': {
      alert(action.type);
      return newState;
    }

    case 'EDIT_BLOCK': {
      // adjust block index prior to removing active block (if needed)
      i = a > i ? i : i - 1; 
      newState.splice(a, 1);

      // promote selected block to active block
      newState = deleteFollow(newState);
      newState[i] = {
        id: 'active',
        follow: true
      }
      return newState;
    }

    case 'DELETE_BLOCK': {
      newState.splice(i, 1);
      return newState;
    }

    case 'MOVE_BLOCK': {
      // restrict movement if index does not exist
      if(action.moveUp && i === 0) {
        return newState;
      }
      if (!action.moveUp && i === newState.length - 1) {
        return newState;
      }
      
      // set target index & swap target blocks
      let j = action.moveUp ? i - 1 : i + 1,
          pull = [i, j].sort(),
          swap = pullAt(newState, pull);
          
      swap.reverse();
      newState.splice(pull[0], 0, ...swap);
      return newState;
    }

    case 'FOLLOW_BLOCK': {
      newState = deleteFollow(newState);
      newState[i].follow = true;
      return newState;
    }

    case 'PUBLISH_BLOCK': {
      newState[a] = {
        id: Date.now(),
        content: action.content,
        follow: true
      }
      newState.splice(++a, 0, {
        id: 'active'
      });
      return newState;
    }

    case 'CANCEL_BLOCK': {
      if(newState[a].content.trim() === '') {
        return newState;
      }
      newState[a].id = Date.now();
      newState.splice(++a, 0, {
        id: 'active',
        follow: true
      });
      return newState;
    }

    default:
      return newState;
  }
}