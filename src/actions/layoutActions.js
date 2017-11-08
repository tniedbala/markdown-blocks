export function openSettings() {
  return {
    type: 'OPEN_SETTINGS',
    data: ''
  }
}

export function toggleEditor() {
  return { type: 'TOGGLE_EDITOR' }
}

export function toggleEditMode() {
  return { type: 'TOGGLE_EDITMODE' }
}

export function movePartition(height, ratio) {
  return {
    type: 'MOVE_PARTITION', 
    height: height,
    ratio: ratio
  }
}

export function toggleState() {
  return { type: 'TOGGLE_STATE' }
} 