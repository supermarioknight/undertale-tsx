import React, { Component } from 'react';
import styled from 'styled-components';
import DialogueBox from './dialogue-box';
import Dodging from './dodging';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

type DialogueBoxState = 'small' | 'medium' | 'large' | 'xlarge' | 'dialogue' | 'attacking';

const dialogueDimensions = {
  small: [200, 200],
  medium: [200, 300],
  large: [300, 300],
  xlarge: [500, 250],
  dialogue: [600, 200],
  attacking: [800, 200],
};

interface BattleProps {}

interface BattleState {
  dialogueState: DialogueBoxState;
}

export default class Battle extends Component<BattleProps, BattleState> {
  state: BattleState = {
    dialogueState: 'small',
  };

  render() {
    const [dialogueWidth, dialogueHeight] = dialogueDimensions[this.state.dialogueState];

    return (
      <Container>
        <DialogueBox width={dialogueWidth} height={dialogueHeight}>
          {({ x, y }) => (
            <Dodging
              onHit={console.log}
              speed={5}
              boundingBox={[x, y, x + dialogueWidth, y + dialogueHeight]}
            />
          )}
        </DialogueBox>
      </Container>
    );
  }
}
