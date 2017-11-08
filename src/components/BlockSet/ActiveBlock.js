import React from 'react';
import { ReactDOM, findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import marked from 'marked';

// active block renders MarkdownBlock/Editor combination
@connect(store => store)
export default class ActiveBlock extends React.Component {
  constructor(props) {
    super(props)
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
