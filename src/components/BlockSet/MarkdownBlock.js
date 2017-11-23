import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import marked from 'marked';
import { Glyphicon, GlyphButton } from '../ItemControls';
import { follow } from '../../actions/layoutActions';
import { addBlock, editBlock, deleteBlock, moveBlock, followBlock, publishBlock } from '../../actions/blockActions';

// sanitize html input
marked.setOptions({ sanitize: true });

// glyphicon buttons visible on hover
@connect((store) => store)
class BlockControl extends React.Component {
  constructor(props) {
    super(props);
    this.controls = [
      { key: 1, title: 'Down', glyph: 'arrow-down', click: () => this.moveBlock(false) },
      { key: 2, title: 'Up', glyph: 'arrow-up', click: () => this.moveBlock(true) },
      { key: 3, title: 'Add', glyph: 'plus', click: this.addBlock },
      { key: 4, title: 'Edit', glyph: 'pencil', click: this.editBlock },
      { key: 5, title: 'Delete', glyph: 'remove', click:this.deleteBlock }
    ]
  }

  addBlock = () => this.props.dispatch(addBlock());
  deleteBlock = () => this.props.dispatch(deleteBlock(this.props.id));  

  // up: moveUp=true; down: moveUp=false
  moveBlock = (moveUp) => {
    let { id, layout } = this.props;
    this.props.dispatch(followBlock(id));
    this.props.dispatch(moveBlock(id, moveUp));
    this.props.dispatch(follow(id));
    document.getElementById(id).scrollIntoView({
      block: 'start',
      inline: 'start',
      behavior: 'smooth'
    });
  }
  
  // edit on pencil icon click, double-click
  editBlock = () => { 
    var block = this.props.blockset.find(block => block.id === this.props.id);
    this.props.dispatch(editBlock(this.props.id, block.content));
  }

  render() {
    return(
      <form className="form-inline block-control top-pad">
        { this.controls.map((controls) => <Glyphicon { ...controls} />) }
      </form>
    );
  }
}


// container for rendered markdown block
@connect((store) => store)
export default class MarkdownBlock extends React.Component {
  constructor(props) { 
    super(props);
  }

  // #activeblock => .markdownblock
  publishBlock = () => {
    if(this.props.editor.content.trim() === '') {
      return
    }
    this.props.dispatch(publishBlock(this.props.editor.content));
  }

  // edit block on double-click
  handleDoubleClick = (event) => {    
    // prevent text selection
    if(document.selection && document.selection.empty) {
      document.selection.empty();
    }    
    if(window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    // publish current editor content prior to changing active block
    this.publishBlock(); 
    var i = this.props.blockset.findIndex((obj) => obj.id === this.props.block.id);
    this.props.dispatch(editBlock(this.props.block.id, this.props.blockset[i].content));
  }

  // TODO - add settings option to toggle .markdown-block cursor style & text selection
  render() {  
    const { block, layout }= this.props,
          classname = 'row markdown-block' + (layout.editmode ? '' : ' preview');
    
    return (
      <div
        id={block.id}
        className={classname}
        title="Double-click to edit"
        style={{cursor: 'default'}}
        onMouseDown={(event) => event.preventDefault()}
        onDoubleClick={this.handleDoubleClick}        
      >
        <hr className="divider-gradient"/>
        <BlockControl id={block.id} controls={this.props.controls} />         
        <div 
          className="container block-content" 
          dangerouslySetInnerHTML={{ __html: marked(this.props.block.content) }} 
        /> 
        <hr className="divider-gradient"/>
      </div>
    );
  }
}