import React from 'react';
import convertStyle from './convertStyle';
import getWindowHeight from './getWindowHeight';

export default class Div100vh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: convertStyle(props.style, getWindowHeight())
    };
  }

  // On mount and window resize converts rvh values to px (if there are any).
  // Also, adds `height: 100rvh` if height is not specified at all
  updateStyle = () => {
    if (!this.props.dontResize) {
      const convertedStyle = convertStyle(this.props.style, getWindowHeight());
      this.setState({ style: convertedStyle });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateStyle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateStyle);
  }

  render() {
    const { dontResize, ...otherProps } = this.props;

    return <div {...otherProps} style={this.state.style} />;
  }
}
