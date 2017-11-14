import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import marked from 'marked';
import Nav from './Nav';
import BlockSet from './BlockSet/BlockSet';
import Editor from './Editor';
import ExpandButton from './ExpandButton';
import Footer from './Footer';
import { resizeEditor, toggleEditor } from '../actions/editorActions';
import { toggleEditMode } from '../actions/layoutActions';
import SplitView from './SplitView';


@connect(store => store)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.resizeInteval = null;
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
            <Editor id="editorContainer" toggleEditor={this.toggleEditor} />
          </SplitView>
          <Footer />
      </div>
    )
  }
}

export default App;


