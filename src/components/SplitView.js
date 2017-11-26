import React from 'react';
import { connect } from 'react-redux';
import { movePartition, toggleResize } from '../actions/layoutActions';


@connect((store) => store)
export default class SplitView extends React.Component {

  constructor(props) {
    super(props);
  }

  // set 60-40 split ratio on component mount
  componentDidMount() {
    let initialHeight = this.splitPane.clientHeight;
    this.props.dispatch(movePartition(initialHeight, 0.4));
    window.addEventListener('resize', this.windowResize);
  }

  // update split.height on window resize
  windowResize = () => {    
    let height = this.splitPane.clientHeight,
        ratio = this.props.layout.split.ratio;
    this.props.dispatch(movePartition(height, ratio));
  }
  
  // calculate height change using mouse coordinates
  handleDrag = (event) => {

    this.props.dispatch(toggleResize(true));
    
    // keep from highlighting text while resizing
    event.preventDefault();

    let y = event.clientY,
        height = this.splitPane.clientHeight,
        lowerHeight = this.bottomPane.clientHeight;

    // set split.ratio on mousemove
    const handleMouseMove = (event) => {
      let lower = lowerHeight + y - event.clientY,
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
    
    const { layout } = this.props,
          { editmode, split } = layout,
          edit = editmode && !split.collapse,
          lowerFlex = split.ratio / (1 - split.ratio),          
          splitStyle = {
            height: `calc(100vh - ${editmode ? 110 : 50}px)`,
            transition: '0.6s'
          },
          lowerStyle = {
            flex: edit ? lowerFlex : 0,
            transition: split.resize ? '0s' : '0.4s'
          }

    return (
        <div id="split-pane" style={splitStyle} ref={splitPane => this.splitPane = splitPane}>
          <div id="top-pane" style={{ flex: 1 }}>  
            { this.props.children[0] }
          </div>
          <div
            id="bottom-pane"
            style={lowerStyle}
            ref={(bottomPane) => this.bottomPane = bottomPane}
          >
            <hr 
              id="partition"
              onMouseDown={this.handleDrag}
              ref={(partition) => this.partition = partition}
            />            
            { this.props.children[1] }
          </div>
        </div>
    );
  }
}

