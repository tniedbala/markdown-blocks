export function editorChange(content) {
  return {
    type: 'EDITOR_CHANGE',
    data: content
  }
}

export function resizeEditor(height) {
  return {
    type: 'RESIZE_EDITOR',
    data: height
  }
}

export function openFile(content) {
  return {
    type: 'OPEN_FILE',
    content: content
  }
}

export function toggleEditor(collapse) {
  return {
    type: 'TOGGLE_EDITOR',
    collapse: collapse
  }
}