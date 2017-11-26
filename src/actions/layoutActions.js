export function openSettings() {
  return {
    type: 'OPEN_SETTINGS',
    data: ''
  }
}

export function toggleEditor() {
  return { 
    type: 'TOGGLE_EDITOR' 
  }
}

export function toggleEditMode() {
  return { 
    type: 'TOGGLE_EDITMODE' 
  }
}

export function movePartition(height, ratio) {
  return {
    type: 'MOVE_PARTITION', 
    height: height,
    ratio: ratio
  }
}

export function toggleState() {
  return { 
    type: 'TOGGLE_STATE' 
  }
} 

export function toggleResize(resize) {
  return {
    type: 'TOGGLE_RESIZE',
    resize
  }
}

export function follow(anchor) {
  return {
    type: 'FOLLOW',
    anchor
  }
}

export function scrollBlock(scroll) {
  return {
    type: 'SCROLL_BLOCK',
    scroll
  }
}