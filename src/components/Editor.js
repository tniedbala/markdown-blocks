import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/chrome';
import { Glyphicon } from './ItemControls';
import { connect } from 'react-redux';
import { toggleEditor, toggleState, follow } from '../actions/layoutActions';
import { editorChange, openFile, setHeight } from '../actions/editorActions';
import { moveBlock, publishBlock, followBlock, cancelBlock } from '../actions/blockActions';


// editor glyphicon buttons
@connect((store) => store)
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


// Ace editor
@connect(store => store)
class Editor extends React.Component {  
  constructor(props) {
    super(props);
  }
  followActive = () => this.props.dispatch(follow('active'));
  setValue = (newValue) => this.refs.aceEditor.editor.setValue(newValue);
  cancelBlock = () => this.props.dispatch(cancelBlock());
  clearEditor = () => this.setValue(''); 
  editorChange = (content) => {
    this.props.dispatch(editorChange(content));
    this.followActive();    
  }
  
  publishBlock = () => {
    if(this.props.editor.content.trim() === '') {
      return;
    }
    this.props.dispatch(publishBlock(this.props.editor.content));    
    this.followActive();
  }

  render() {
    const split = this.props.layout.split,
          editorHeight = split.height * split.ratio - 50; // - 100; // - 165;
    
    return ( 
      <div 
        ref="editorPane"
        id={this.props.id}
        className={'test split split-vertical fade-' + (this.props.layout.editmode ? 'in' : 'out')}>   
        <div className="panel panel-default" style={{ border: 'none' }}>         
          <div className="panel-body">
            <AceEditor
              ref="aceEditor"
              name="editor"
              mode="markdown"
              theme="chrome"
              width="100%"
              height={editorHeight + 'px'}
              fontSize={16}
              wrapEnabled={true}
              focus={true}
              highlightActiveLine={false}
              showGutter={false}
              editorProps={{$blockScrolling: true}}
              value={this.props.editor.content}  
              onChange={this.editorChange} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;


/*
          <div className="container btn-group" role="group" aria-label="...">
            <button type="button" className="btn btn-primary" onClick={this.publishBlock}>Publish</button>
            <button type="button" className="btn btn-default" onClick={this.clearEditor}>Clear</button>
            <button type="button" className="btn btn-default" onClick={this.cancelBlock}>Cancel</button>
          </div>

*/