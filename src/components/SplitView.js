import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { movePartition, toggleResize } from '../actions/layoutActions';


@connect(store => store)
export default class SplitView extends React.Component {
  constructor(props) {
    super(props);
  }

  // set 50-50 split ratio on component mount
  componentDidMount() {
    let initialHeight = this.splitPane.clientHeight;
    this.props.dispatch(movePartition(initialHeight, 0.5));
    window.addEventListener('resize', this.windowResize);
  }

  // update dimensions on window resize
  windowResize = () => {    
    let height = this.splitPane.clientHeight,
        ratio = this.props.layout.split.ratio;
    this.props.dispatch(movePartition(height, ratio));
  }
  
  // calculate height change using change in mouse coordinates
  handleDrag = (event) => {
    
    this.props.dispatch(toggleResize(true));
    event.preventDefault();

    let initialY = event.clientY,
        height = this.splitPane.clientHeight,
        lowerHeight = this.bottomPane.clientHeight;

    // resize lower panel on mousemove
    const handleMouseMove = (event) => {
      let lower = lowerHeight + initialY - event.clientY,
          ratio = lower / height;
      this.props.dispatch(movePartition(height, ratio));
    }

    // remove mousemove
    const handleMouseUp = () => {
      this.props.dispatch(toggleResize(false));
      document.removeEventListener('mousemove', handleMouseMove);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  render() {
    // set height dimensions
    const { layout } = this.props,
          { editmode, collapse, split } = layout,
          edit = editmode && !collapse,
          lowerHeight = edit ? split.height * split.ratio : 0,
          upperHeight = edit ? split.height - lowerHeight : split.height - 60,
          transition = edit ? '0s' : '1s';
    
    const lower = Math.round(split.ratio * 1000),
          upper = Math.round(1000 - lower),
          lowerStyle = { 
            flex: edit ? lower : 0,
            transition: edit ? '0s' : '0.6s'
          }

    return (
        <div id="split-pane" ref={splitPane => this.splitPane = splitPane}>
          <div id="top-pane" style={{ flex: upper }}>  
            { this.props.children[0] }
          </div>
          <div
            id="bottom-pane"
            style={ lowerStyle }
            ref={bottomPane => this.bottomPane = bottomPane}
          >
            <hr 
              id="partition"
              onMouseDown={this.handleDrag}
              ref={partition => this.partition = partition}
            />            
            { this.props.children[1] }
          </div>
        </div>
    );
  }
}

