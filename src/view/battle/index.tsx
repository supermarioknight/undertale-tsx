import React, { Component } from 'react';
import styled from 'styled-components';
import DialogueBox from './dialogue-box';
import { rand } from '../../lib/rand';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

interface BattleProps {}

export default class Battle extends Component<BattleProps> {
  state = {
    box: 'small',
  };

  setDialogueBox = () => {
    const val = ['small', 'large', 'xlarge', 'dialogue', 'attacking'];
    this.setState((prev: any) => ({
      box: rand(val, prev.box),
    }));
  };

  render() {
    return (
      <Container onClick={this.setDialogueBox}>
        <DialogueBox state={this.state.box as any} />
      </Container>
    );
  }
}
