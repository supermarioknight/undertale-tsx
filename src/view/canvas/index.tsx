import React from 'react';
import styled from 'styled-components';

const Root = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

interface CanvasProps {
  inheritParentDimensions: boolean;
}

export default class Canvas extends React.Component<CanvasProps> {
  static defaultProps = {
    inheritParentDimensions: true,
  };

  canvasElement: HTMLCanvasElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;

  componentDidMount() {
    if (this.canvasElement && this.canvasElement.parentElement) {
      if (this.props.inheritParentDimensions) {
        this.canvasElement.height = this.canvasElement.parentElement.clientHeight;
        this.canvasElement.width = this.canvasElement.parentElement.clientWidth;
      }

      this.canvasContext = this.canvasElement.getContext('2d');
    }
  }

  setRef = (ref: any) => {
    this.canvasElement = ref;
  };

  render() {
    return <Root ref={this.setRef} />;
  }
}
