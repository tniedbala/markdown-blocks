import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Glyphicon, GlyphButton } from '../ItemControls';
import ActiveBlock from './ActiveBlock';
import MarkdownBlock from './MarkdownBlock';


// ActiveBlock || MarkdownBlock
const Block = (props) => {
  if(props.block.id === 'active') {
    return <ActiveBlock block={props.block} />
  } else {
    return <MarkdownBlock block={props.block} />
  }
}


// container for all blocks
@connect((store) => store)
export default class BlockSet extends React.Component {
  constructor(props) {
    super(props);
  }

  // scroll to layout.follow on update
  componentDidUpdate() {
    // prevent scrolling on SplitView resize (avoid jerky motions)
    const { layout } = this.props;
    
    if(!layout.split.resize && this.follow) {
      this.follow.scrollIntoView({
        block: 'start',
        inline: 'nearest',
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
    const { layout, blockset } = this.props;
    //const blockset = this.props.layout.editmode ? this.props.blockset : this.compositeBlock();
    let i = 0;

    return (      
      <div id="blockset" className="container" role="main">
        {
            blockset.map((block) => {
              // -----------------------------------------------------------------------         
              // temporary - render app state in first block
              if(i === 0 && this.props.layout.editmode) { block.content = this.showState(); }
              i++;
              // -----------------------------------------------------------------------
              if(block.id === layout.follow) {
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
    );
  }
}
