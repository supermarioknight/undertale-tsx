import React from 'react';
import { interpolate } from '../../../lib/interpolate';
import { limit } from '../../../lib/limit';
import { listenTo } from '../../../lib/event';
import Canvas from '../../canvas';

type Movement = -1 | 0 | 1;

const move = (
  position: number,
  movement: Movement,
  speed: number,
  minMax: [number, number]
): number => {
  switch (movement) {
    case -1:
      return limit(interpolate(position, position - speed, speed), minMax);

    case 0:
      return limit(position, minMax);

    case 1:
      return limit(interpolate(position, position + speed, speed), minMax);
  }
};

interface DodgingProps {
  speed: number;
  boundingBox: [number, number, number, number];
  heartColor: string;
}

export default class Dodging extends React.Component<DodgingProps> {
  static defaultProps = {
    heartColor: 'red',
  };

  canvasRef: Canvas | null = null;
  x: number = 0;
  y: number = 0;
  xMovement: Movement = 0;
  yMovement: Movement = 0;

  componentDidMount() {
    listenTo('keydown', e => {
      switch (e.key) {
        case 'ArrowRight':
          this.xMovement = 1;
          break;

        case 'ArrowLeft':
          this.xMovement = -1;
          break;

        case 'ArrowUp':
          this.yMovement = -1;
          break;

        case 'ArrowDown':
          this.yMovement = 1;
          break;
      }
    });

    listenTo('keyup', e => {
      switch (e.key) {
        case 'ArrowRight':
          this.xMovement = 0;
          break;

        case 'ArrowLeft':
          this.xMovement = 0;
          break;

        case 'ArrowUp':
          this.yMovement = 0;
          break;

        case 'ArrowDown':
          this.yMovement = 0;
          break;
      }
    });

    this.draw();
  }

  draw = () => {
    const canvas = this.canvasRef;
    if (!canvas || !canvas.canvasElement || !canvas.canvasContext) return;

    const ctx = canvas.canvasContext;
    if (ctx) {
      // const [x1, y1, x2, y2] = this.props.boundingBox;
      this.x = move(this.x, this.xMovement, this.props.speed, [311, 915]);
      this.y = move(this.y, this.yMovement, this.props.speed, [450, 650]);

      ctx.clearRect(0, 0, canvas.canvasElement.width, canvas.canvasElement.height);
      ctx.fillStyle = this.props.heartColor;
      ctx.fillRect(this.x, this.y, 25, 25);

      requestAnimationFrame(this.draw);
    }
  };

  setRef = (ref: Canvas | null) => {
    this.canvasRef = ref;
  };

  render() {
    return <Canvas ref={this.setRef} />;
  }
}
