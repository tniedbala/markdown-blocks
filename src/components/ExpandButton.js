import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Glyphicon } from './ItemControls';


@connect(store => store)
export default class ExpandButton extends React.Component {
  constructor(props) {
    super(props);
  }

  publishBlock = () => {
    if(this.props.editor.content.trim() === '') {
      return;
    }
    this.props.dispatch(publishBlock('active', this.props.editor.content));
    this.setValue('');
  }

  render() {
    return (
      <div className={'expand-float fade-' + (this.props.layout.editmode ? 'in' : 'out')}>
          <Glyphicon 
            id="expand-btn"
            title="Expand" 
            glyph={'menu-up edit-options' + (!this.props.editor.collapse ? ' hide' : '')} 
            click={() => this.props.toggleEditor(false)}
          />
        </div>
    );
  }
}