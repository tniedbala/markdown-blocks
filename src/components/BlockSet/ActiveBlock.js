import React from 'react';
import { connect } from 'react-redux';
import { followBlock } from '../../actions/blockActions';
import { follow } from '../../actions/layoutActions';
import marked from 'marked';

// sanitize html input
marked.setOptions({ sanitize: true });

// active block renders MarkdownBlock/Editor combination
@connect((store) => store)
export default class ActiveBlock extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {

    const { layout } = this.props,
          { editmode } = layout,
          classname = "row top-pad bottom-pad" + (editmode ? '' : ' preview');

    return (
      <div 
        id="active" 
        className={classname}
        ref={(activeBlock) => this.activeBlock = activeBlock}
      >
        <hr />
        <div 
          id="activeblock-content"
          style={{ cursor: (editmode ? 'default' : 'auto') }}
          onMouseDown={(event) => editmode ? event.preventDefault() : null }
          dangerouslySetInnerHTML={{ __html: marked(this.props.editor.content) }} />
        <hr />
      </div>
    );
  }
}
