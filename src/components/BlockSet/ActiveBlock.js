import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { followBlock } from '../../actions/blockActions';
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
        id="activeblock" 
        className="row top-pad bottom-pad"
        ref={activeBlock => this.activeBlock = activeBlock}
      >
        <hr className="divider-gradient" />
        <div className="container bottom-pad">
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.editor.content) }} />
        </div>
        <hr className="divider-gradient" />
      </div>
    );
  }
}
