import React from 'react';
import { interpolate } from '../../../lib/interpolate';

type DialogueBoxState = 'small' | 'large' | 'xlarge' | 'dialogue' | 'attacking';

const dialogueDimensions = {
  small: [200, 200],
  large: [400, 400],
  xlarge: [600, 400],
  dialogue: [600, 200],
  attacking: [800, 200],
};

interface DialogueBoxProps {
  state: DialogueBoxState;
  growth: number;
  border: number;
}

export default class DialogueBox extends React.Component<DialogueBoxProps> {
  static defaultProps = {
    growth: 15,
    border: 4,
  };

  canvasRef: HTMLCanvasElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;
  width: number = dialogueDimensions[this.props.state][0];
  height: number = dialogueDimensions[this.props.state][1];

  componentDidMount() {
    if (this.canvasRef && this.canvasRef.parentElement) {
      this.canvasRef.height = this.canvasRef.parentElement.clientHeight;
      this.canvasRef.width = this.canvasRef.parentElement.clientWidth;
      this.canvasContext = this.canvasRef.getContext('2d');
      this.draw(this.props.state);
    }
  }

  componentDidUpdate(prevProps: DialogueBoxProps) {
    if (prevProps.state !== this.props.state) {
      this.draw(this.props.state);
    }
  }

  draw(state: DialogueBoxState) {
    const canvas = this.canvasRef;
    if (!canvas) return;

    const ctx = this.canvasContext;
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const [finalWidth, finalHeight] = dialogueDimensions[state];
      ctx.fillStyle = '#fff';
      const x = Math.ceil((canvas.width - this.width) / 2);
      const y = Math.ceil((canvas.height - this.height) * 0.7);
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
          this.draw(state);
        });
      }
    }
  }

  setRef = (ref: HTMLCanvasElement | null) => {
    this.canvasRef = ref;
  };

  render() {
    return <canvas ref={this.setRef} />;
  }
}
