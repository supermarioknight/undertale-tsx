import React, { Component } from 'react';
import styled from 'styled-components';
import DialogueBox from './dialogue-box';
import Dodging from './dodging';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

type DialogueBoxState = 'small' | 'large' | 'xlarge' | 'dialogue' | 'attacking';

const dialogueDimensions = {
  small: [200, 200],
  large: [400, 400],
  xlarge: [600, 400],
  dialogue: [600, 200],
  attacking: [800, 200],
};

interface BattleProps {}

interface BattleState {
  dialogueState: DialogueBoxState;
}

export default class Battle extends Component<BattleProps, BattleState> {
  state: BattleState = {
    dialogueState: 'dialogue',
  };

  render() {
    const [dialogueWidth, dialogueHeight] = dialogueDimensions[this.state.dialogueState];

    return (
      <Container>
        <DialogueBox width={dialogueWidth} height={dialogueHeight}>
          {({ x, y }) => <Dodging speed={7} boundingBox={[x, y, dialogueWidth, dialogueHeight]} />}
        </DialogueBox>
      </Container>
    );
  }
}
