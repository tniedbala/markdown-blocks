import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Glyphicon } from './ItemControls';
import { toggleEditor } from '../actions/layoutActions';
import { editorChange, openFile, setHeight } from '../actions/editorActions';
import { moveBlock, publishBlock, followBlock, cancelBlock } from '../actions/blockActions';


@connect(store => store)
class EditorHeading extends React.Component {
  constructor(props) {
    super(props);
    this.controls = [
      { key: 1, title: 'Collapse', glyph: 'menu-down', click: this.toggleEditor },
      { key: 2, title: 'Down', glyph: 'arrow-down', click: () => this.moveBlock(false) },
      { key: 3, title: 'Up', glyph: 'arrow-up', click: () => this.moveBlock(true) }
    ]
  }

  toggleEditor = () => this.props.dispatch(toggleEditor());
  moveBlock = (moveUp) => this.props.dispatch(moveBlock('active', moveUp));
  
  render() {
    return(
      <div id="editorHeading" className="panel-heading">
        {
          this.controls.map(controls => {
            controls.className = 'pull-right edit-options';
            return <Glyphicon { ...controls} />
          })
        }
        <span>Markdown</span>
      </div>
    )
  }
}


@connect(store => store)
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.controls = [
      { key: 1, title: 'Collapse', glyph: 'menu-down', click: this.toggleEditor },
      { key: 2, title: 'Down', glyph: 'arrow-down', click: () => this.moveBlock(false) },
      { key: 3, title: 'Up', glyph: 'arrow-up', click: () => this.moveBlock(true) }
    ]
  }

  toggleEditor = () => this.props.dispatch(toggleEditor());
  moveBlock = (moveUp) => this.props.dispatch(moveBlock('active', moveUp));
  setValue = (newValue) => this.refs.aceEditor.editor.setValue(newValue);
  cancelBlock = () => this.props.dispatch(cancelBlock());
  clearEditor = () => this.setValue(''); 
  editorChange = (content) => this.props.dispatch(editorChange(content));
  
  publishBlock = () => {
    if(this.props.editor.content.trim() === '') {
      return;
    }
    this.props.dispatch(publishBlock(this.props.editor.content));
  }

  render() {
    return(
      <footer className="footer">
        <div style={{ paddingTop: '15px', paddingLeft: '15px', float: 'left' }}>
          <button type="button" className="btn btn-primary" onClick={this.publishBlock}>Publish</button>
          <button type="button" className="btn btn-default" onClick={this.clearEditor}>Clear</button>
          <button type="button" className="btn btn-default" onClick={this.cancelBlock}>Cancel</button>
        </div>
        <div style={{ paddingTop: '15px', paddingRight: '15px', float:'right' }}>
        {
          this.controls.map(controls => {
            controls.className = 'pull-right edit-options';
            return <Glyphicon { ...controls} />
          })
        }
        </div>
      </footer>
    )
  }
}