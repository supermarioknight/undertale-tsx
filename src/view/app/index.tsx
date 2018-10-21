import React, { Component } from 'react';
import Battle from '../battle';
import { GlobalStyles, AppContainer } from './styled';

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <GlobalStyles />
        <Battle />
      </AppContainer>
    );
  }
}
