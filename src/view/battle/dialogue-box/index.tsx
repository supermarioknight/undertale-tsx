import React from 'react';
import Canvas from '../../canvas';
import { interpolate } from '../../../lib/interpolate';

interface DialogueBoxProps {
  width: number;
  height: number;
  speed: number;
  border: number;
  children: (props: { x: number; y: number }) => React.ReactNode;
}

export default class DialogueBox extends React.Component<DialogueBoxProps> {
  static defaultProps = {
    speed: 15,
    border: 4,
  };

  width: number = this.props.width;
  height: number = this.props.height;
  canvasRef: Canvas | null = null;

  componentDidMount() {
    this.draw();
    this.setState({});
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const canvas = this.canvasRef;
    if (!canvas || !canvas.canvasElement || !canvas.canvasContext) return;

    const ctx = canvas.canvasContext;
    if (ctx) {
      ctx.clearRect(0, 0, canvas.canvasElement.width, canvas.canvasElement.height);
      ctx.fillStyle = '#fff';

      const finalWidth = this.props.width;
      const finalHeight = this.props.height;
      const x = Math.ceil((canvas.canvasElement.width - this.width) / 2);
      const y = Math.ceil((canvas.canvasElement.height - this.height) * 0.7);
      ctx.fillRect(
        x - this.props.border,
        y - this.props.border,
        this.width + this.props.border * 2,
        this.height + this.props.border * 2
      );
      ctx.clearRect(x, y, this.width, this.height);

      if (finalWidth !== this.width || finalHeight !== this.height) {
        requestAnimationFrame(() => {
          this.width = interpolate(this.width, finalWidth, this.props.speed);
          this.height = interpolate(this.height, finalHeight, this.props.speed);
          this.draw();
        });
      }
    }
  }

  setRef = (ref: Canvas | null) => {
    this.canvasRef = ref;
  };

  render() {
    if (this.canvasRef && this.canvasRef.canvasElement) {
      const x = Math.ceil((this.canvasRef.canvasElement.width - this.props.width) / 2);
      const y = Math.ceil((this.canvasRef.canvasElement.height - this.props.height) * 0.7);

      return (
        <React.Fragment>
          <Canvas ref={this.setRef} />
          {this.props.children({ x, y })}
        </React.Fragment>
      );
    }

    return <Canvas ref={this.setRef} />;
  }
}
