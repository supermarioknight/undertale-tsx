import React from 'react';
import Canvas from '../../canvas';
import { interpolate } from '../../../lib/interpolate';

interface DialogueBoxProps {
  width: number;
  height: number;
  growth: number;
  border: number;
}

export default class DialogueBox extends React.Component<DialogueBoxProps> {
  static defaultProps = {
    growth: 15,
    border: 4,
  };

  width: number = this.props.width;
  height: number = this.props.height;
  canvasRef: Canvas | null = null;

  componentDidMount() {
    this.draw();
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
      const finalWidth = this.props.width;
      const finalHeight = this.props.height;
      ctx.fillStyle = '#fff';
      const x = Math.ceil((canvas.canvasElement.width - this.width) / 2);
      const y = Math.ceil((canvas.canvasElement.height - this.height) * 0.7);
      ctx.fillRect(x, y, this.width, this.height);
      ctx.clearRect(
        x + this.props.border,
        y + this.props.border,
        this.width - this.props.border * 2,
        this.height - this.props.border * 2
      );

      if (finalWidth !== this.width || finalHeight !== this.height) {
        requestAnimationFrame(() => {
          this.width = interpolate(this.width, finalWidth, this.props.growth);
          this.height = interpolate(this.height, finalHeight, this.props.growth);
          this.draw();
        });
      }
    }
  }

  setRef = (ref: Canvas | null) => {
    this.canvasRef = ref;
  };

  render() {
    return <Canvas ref={this.setRef} />;
  }
}
