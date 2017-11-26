import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import Nav from './Nav';
import BlockSet from './BlockSet/BlockSet';
import Editor from './Editor';
import Footer from './Footer';
import { resizeEditor } from '../actions/editorActions';
import { toggleEditMode, toggleEditor, scrollBlock } from '../actions/layoutActions';
import SplitView from './SplitView';


@connect((store) => store)
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.resizeInteval = null;
  }

  // expand/collapse editor
  toggleEditor = () => {
    const { layout } = this.props;
    this.props.dispatch(scrollBlock(false));
    this.props.dispatch(toggleEditor());

    // scroll to block after expanding editor
    setTimeout(() => this.props.dispatch(scrollBlock(true)), 400);
  }

  render() {
    return (
      <div>
        <Nav 
          storeMarkdown={this.storeMarkdown} 
          editmode={this.props.editmode} 
          toggleEditor={this.toggleEditor} 
        />
          <SplitView>
            <BlockSet 
              id="blockContainer"
              editmode={this.props.editmode}
              blocks={this.props.blockset}
              editorContent={this.props.editor.content} 
            />
            <Editor id="editorContainer"/> 
          </SplitView>
          <Footer toggleEditor={this.toggleEditor} />
      </div>
    )
  }
}

export default App;


