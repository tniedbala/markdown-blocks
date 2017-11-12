import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Glyphicon, GlyphButton } from '../ItemControls';
import ActiveBlock from './ActiveBlock';
import MarkdownBlock from './MarkdownBlock';
import { followBlock } from '../../actions/blockActions';


// ActiveBlock || MarkdownBlock
const Block = (props) => {
  if(props.block.id === 'active') {
    return <ActiveBlock block={props.block} />
  } else {
    return <MarkdownBlock block={props.block} />
  }
}


// container for all blocks
@connect(store => store)
export default class BlockSet extends React.Component {
  constructor(props) {
    super(props);
  }

  // scroll to block.follow on update
  componentDidUpdate() {   
    if(this.follow) {
      this.follow.scrollIntoView({
        block: 'start',
        inline: 'start',
        behavior: 'smooth'
      });
    }
  }

  // aggregate blocks into single markdown string
  compositeBlock = () => {
    var content = '';
    this.props.blockset.forEach(block => content += block.content + '\n\n');
    return [{ id: Date.now(), content: content }];
  }

  // temporary - render app state in first block
  showState = () => {
    let quotes = '```';
    let appState = {
      layout: this.props.layout,
      editor: this.props.editor,
      blockset: this.props.blockset
    }
    appState.blockset[0].content = '{ ...state }';    
    return  `${quotes}n${JSON.stringify(appState, null, 4)}\n${quotes}`;
  }

  render() {
    // render composite block when editmode == false
    const blockset = this.props.layout.editmode ? this.props.blockset : this.compositeBlock();
    let i = 0;

    return (
      <div id={this.props.id} className="split split-vertical">
        <div id="canvas" className="container" role="main">
        <a 
          ref={scroll => this.scroll = scroll}
          href={this.props.layout.follow}
          style={{ display: 'none' }} 
        />
          {
              blockset.map(block => {                
                // -----------------------------------------------------------------------         
                // temporary - render app state in first block
                if(i===0 && this.props.layout.editmode) { block.content = this.showState(); }
                i++;
                // -----------------------------------------------------------------------
                if(block.follow) {
                  return (
                    <div ref={follow => this.follow = follow}>
                      <Block block={block} />
                    </div>
                  );
                } else {
                  return <Block block={block} />
                }
              })
            }
        </div>
      </div>
    );
  }
}
