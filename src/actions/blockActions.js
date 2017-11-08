export function publishBlock(content) {
  return {
    type: 'PUBLISH_BLOCK',
    id: 'active',
    content: content
  }
}

export function cancelBlock() {
  return {
    type: 'CANCEL_BLOCK',
    id: 'active'
  }
}

export function addBlock() {
  return {
    type: 'ADD_BLOCK',
    id: ''
  }
}

export function editBlock(id, content) {
  return {
    type: 'EDIT_BLOCK',
    id: id,
    content: content
  }
}

export function deleteBlock(id) {
  return {
    type: 'DELETE_BLOCK',
    id: id
  }
}

export function moveBlock(id, moveUp=true) {
  return {
    type: 'MOVE_BLOCK',
    id: id,
    moveUp: moveUp
  }
}

export function followBlock(id) {
  return {
    type: 'FOLLOW_BLOCK',
    id: id
  }
}