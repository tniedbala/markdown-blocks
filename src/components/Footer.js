import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Glyphicon } from './ItemControls';
import { toggleEditor } from '../actions/layoutActions';
import { editorChange, openFile, setHeight } from '../actions/editorActions';
import { moveBlock, publishBlock, followBlock, cancelBlock } from '../actions/blockActions';


class FooterBtn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { layout } = this.props;
    return (
      <button
        type="button"
        key={this.props.key}
        className={`btn btn-${this.props.btnStyle}`}
        onClick={this.props.click}
      >
        {this.props.text}
      </button>
    )
  }
}


@connect((store) => store)
export default class Footer extends React.Component {
  
  constructor(props) {
    super(props);  

    this.buttons = [
      { key: 1, text: 'Publish', btnStyle: 'primary', click: this.publishBlock },
      { key: 2, text: 'Clear', btnStyle: 'default', click: this.clearEditor },
      { key: 3, text: 'Collapse', btnStyle: 'default', click: this.cancelBlock }
    ]

    let classname = 'pull-right edit-options';
    this.controls = [
      { key: 1, title: 'Collapse', className: classname, glyph: 'menu-down', click: this.toggleEditor },
      { key: 2, title: 'Down', className: classname, glyph: 'arrow-down', click: () => this.moveBlock(false) },
      { key: 3, title: 'Up', className: classname, glyph: 'arrow-up', click: () => this.moveBlock(true) }
    ]
  }

  moveBlock = (moveUp) => this.props.dispatch(moveBlock('active', moveUp));
  setValue = (newValue) => this.refs.aceEditor.editor.setValue(newValue);
  cancelBlock = () => this.props.dispatch(cancelBlock());
  clearEditor = () => this.setValue(''); 
  editorChange = (content) => this.props.dispatch(editorChange(content));

  // expand/collapse editor
  toggleEditor = () => {
    this.props.dispatch(toggleEditor());
    setTimeout(() => this.props.dispatch(toggleEditor()), 600);
  }
  
  publishBlock = () => {
    if(this.props.editor.content.trim() === '') {
      return;
    }
    this.props.dispatch(publishBlock(this.props.editor.content));

  }

  render() {

    const { layout } = this.props,
          { split } = layout,
          preview = layout.editmode ? '' : ' preview',
          collapsed = split.collapse ? 'collapsed' : '';

    return(
      <footer className={`footer ${preview} ${collapsed}`}>
        <div className="footer-controls" style={{ paddingTop: '15px', paddingLeft: '15px', float: 'left' }}>
        {
          this.buttons.map((button) => <FooterBtn { ...button} />)
        }
        </div>
        <div className="footer-controls" style={{ paddingTop: '15px', paddingRight: '15px', float:'right' }}>
        {
          this.controls.map((control) => <Glyphicon { ...control} />)
        }
        </div>
      </footer>
    )
  }
}