import React from 'react';
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
    // prevent scrolling on SplitView resize (avoids jerky motions)
    const { layout } = this.props,
          { editmode, split } = layout;
    
    //if(!split.resize && this.follow) {
    if(!split.resize && layout.scroll) {
      this.follow.scrollIntoView({
        block: (layout.follow === 'active' ? 'end' : 'start'),
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

  render() {
    // render composite block when editmode == false
    const { layout, blockset } = this.props;
    let i = 0;

    return (      
      <div id="blockset" className="container" role="main">
        {
            blockset.map((block) => {
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
