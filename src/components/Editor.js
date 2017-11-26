import React from 'react';
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

  // temporary - show app state in editor
  showState() {
    let quotes = '```';
    let state = {
      layout: this.props.layout,
      editor: this.props.editor,
      blockset: this.props.blockset
    }
    state.editor.content = '...';
    return `${quotes}\n${JSON.stringify(state, null, 2)}\n${quotes}`;
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
    const { editor } = this.props,
          content = editor.content.trim();

    if(content === '') {
      return;
    }
    this.props.dispatch(publishBlock(content));
    this.followActive();
  }

  render() {

    const { layout, editor } = this.props,
          { split } = layout,
          editorHeight = split.height * split.ratio - 50;
    
    return ( 
      <div id={this.props.id} className='split split-vertical'>   
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
              value={ /* this.showState() */ editor.content }  
              onChange={this.editorChange} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
