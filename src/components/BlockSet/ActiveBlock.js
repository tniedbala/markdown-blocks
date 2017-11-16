import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { followBlock } from '../../actions/blockActions';
import { follow } from '../../actions/layoutActions';
import marked from 'marked';

// sanitize html input
marked.setOptions({ sanitize: true });

// active block renders MarkdownBlock/Editor combination
@connect(store => store)
export default class ActiveBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  // follow active block if no other block is followed
  componentDidUpdate() {
    let { layout, blockset } = this.props,
        { editmode, collapse } = layout,
        noFollow = blockset.every((block) => !block.follow);

    if(noFollow && editmode && !collapse) {
      this.props.dispatch(followBlock('active'));
    }
  }

  render() {
    return (
      <div 
        id="active" 
        className="row top-pad bottom-pad"
        ref={activeBlock => this.activeBlock = activeBlock}
      >
        <hr className="divider-gradient" />
        <div id="activeblock-content" dangerouslySetInnerHTML={{ __html: marked(this.props.editor.content) }} />
        <hr className="divider-gradient" />
      </div>
    );
  }
}
