import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import { connect } from 'react-redux';
import { GlyphButton, GlyphDropdown } from './ItemControls';
import { openSettings, downloadMarkdown, toggleEditMode } from '../actions/layoutActions';
import { openFile } from '../actions/editorActions';


// Nav menu items
const Menu = (props) => {
  return(
    <ul className="nav navbar-nav">
      { props.menuOptions.map(item => <GlyphButton {...item} />) }
      <GlyphDropdown title="Download" glyph="save" dropdownItems={props.downloadOptions} />
    </ul>
  );
}


// edit mode slider
const EditToggle = (props) => {
  return (
    <label title="Toggle edit mode" className="edit-switch navbar-right">
      <p className="navbar-brand">Edit</p>
      <input id="edit-mode" type="checkbox" checked={props.editmode} onChange={props.handleChange} />
      <div className="slider round" />
    </label>
  );
}


// top navbar
@connect(store => store)
class Nav extends React.Component {
  constructor(props) {
    super(props);    
    this.menuOptions = [
      { key: 1, title: 'About', glyph: 'info-sign', click: () => alert(JSON.stringify(this.props, null, 2)) }, // temporary - should open project page
      { key: 2, title: 'Open', glyph: 'folder-open', click: this.openFileDialog }
    ]
    this.downloadOptions = [
      { key: 1, content: 'Markdown', type: 'text/plain', download: 'markdown.md', click: this.downloadMarkdown },
      { key: 2, content: 'HTML', type: 'text/html', download: 'markdown.html', click: this.downloadMarkdown },
      { key: 3, content: 'JSON', type: 'text/json', download: 'markdown.json', click: this.downloadMarkdown }
    ]
  }
  
  toggleEditMode = () => {    
    //this.props.toggleEditor(this.props.layout.editmode);
    this.props.dispatch(toggleEditMode());    
  }
  
  openFile = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();        
    reader.onload = (event) => {
      this.props.dispatch(openFile(event.target.result));
    };
    reader.readAsText(file);
  }

  openFileDialog = () => {
    this.refs.fileDialog.click();
  }

  downloadMarkdown = (event) => {
    var content = '';
    var blockset = this.props.blockset.filter(block => block.id != 'active');
    blockset.forEach(block => content += block.content + '\n\n');
    
    if(event.target.type==='text/html') {      
      content = marked(content);
    }
    if(event.target.type==='text/json') {      
      content = JSON.stringify(blockset, null, 4);
    }
    var markdownFile = new Blob([content.trim()]);
    event.target.href = URL.createObjectURL(markdownFile);
  }

  render() {
    return(
      <div style={{marginBottom: '50px'}}>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container" >
            <div id="navbar" className="navbar-collapse">
              <a className="navbar-brand" href="#">Markdown Blocks</a>
              <Menu menuOptions={this.menuOptions} downloadOptions={this.downloadOptions} />
              <EditToggle editmode={this.props.layout.editmode} handleChange={this.toggleEditMode} />
            </div>
            <input ref="fileDialog" type="file" id="input" accept=".md, .json, .txt" onChange={this.openFile} />
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;