import React from 'react';
import { interpolate } from '../../../lib/interpolate';
import { limit } from '../../../lib/limit';
import { listenTo } from '../../../lib/event';
import Canvas from '../../canvas';
import DodgingParticles, { ParticleUpdate } from '../dodging-particles';
import { BoundingBox } from '../types';
import { intersects } from '../../../lib/intersects';

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
  boundingBox: BoundingBox;
  heartColor: string;
  heartSize: number;
  gravityPullX: Movement;
  gravityPullY: Movement;
  invincibilityFrames: number;
  onHit: (damage: number) => void;
}

const calcInitialHeartPosition = (boundingBox: BoundingBox, heartSize: number) => {
  const [x1, y1, x2, y2] = boundingBox;

  return {
    x: x1 + (x2 - x1) / 2 - heartSize / 2,
    y: y1 + (y2 - y1) / 2 - heartSize / 2,
  };
};

export default class Dodging extends React.Component<DodgingProps> {
  static defaultProps = {
    heartColor: 'red',
    heartSize: 40,
    gravityPullY: 0,
    gravityPullX: 0,
    invincibilityFrames: 60,
  };

  invincible: number | undefined;
  unlisten: (() => void) | null = null;
  canvasRef: Canvas | null = null;
  x: number = calcInitialHeartPosition(this.props.boundingBox, this.props.heartSize).x;
  y: number = calcInitialHeartPosition(this.props.boundingBox, this.props.heartSize).y;
  xMovement: Movement = this.props.gravityPullX;
  yMovement: Movement = this.props.gravityPullY;

  componentDidMount() {
    this.unlisten = listenTo(['keydown', 'keyup'], e => {
      if (e.type === 'keydown') {
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
      } else if (e.type === 'keyup') {
        switch (e.key) {
          case 'ArrowRight':
            this.xMovement = this.props.gravityPullX;
            break;

          case 'ArrowLeft':
            this.xMovement = this.props.gravityPullX;
            break;

          case 'ArrowUp':
            this.yMovement = this.props.gravityPullY;
            break;

          case 'ArrowDown':
            this.yMovement = this.props.gravityPullY;
            break;
        }
      }
    });

    this.draw();
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  draw = () => {
    const canvas = this.canvasRef;
    if (!canvas || !canvas.canvasElement || !canvas.canvasContext) return;

    const ctx = canvas.canvasContext;
    if (ctx) {
      const { heartSize, heartColor, boundingBox, speed } = this.props;
      ctx.clearRect(0, 0, canvas.canvasElement.width, canvas.canvasElement.height);

      const [x1, y1, x2, y2] = boundingBox;
      this.x = move(this.x, this.xMovement, speed, [x1, x2 - heartSize]);
      this.y = move(this.y, this.yMovement, speed, [y1, y2 - heartSize]);

      ctx.fillStyle = heartColor;
      ctx.fillRect(this.x, this.y, heartSize, heartSize);

      requestAnimationFrame(this.draw);
    }
  };

  calculateHit = (particles: ParticleUpdate[]) => {
    const heartPosition: BoundingBox = [
      this.x,
      this.y,
      this.x + this.props.heartSize,
      this.y + this.props.heartSize,
    ];

    particles.forEach(particle => {
      const particlePosition = particle.boundingBox;
      if (intersects(heartPosition)(particlePosition)) {
        if (this.invincible === undefined) {
          this.props.onHit(particle.damage);
          this.invincible = 0;
        }
      }
    });

    if (this.invincible === this.props.invincibilityFrames) {
      this.invincible = undefined;
    } else if (this.invincible !== undefined) {
      this.invincible += 1;
    }
  };

  setRef = (ref: Canvas | null) => {
    this.canvasRef = ref;
  };

  render() {
    return (
      <React.Fragment>
        <Canvas ref={this.setRef} />
        <DodgingParticles
          boundingBox={this.props.boundingBox}
          particles={[
            { width: 10, height: 10, behaviour: 'bounce', start: [50, 50], speed: 10, damage: 1 },
          ]}
          onUpdate={this.calculateHit}
        />
      </React.Fragment>
    );
  }
}
