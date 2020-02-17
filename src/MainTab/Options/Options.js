import React, { Component } from 'react';
import { Container, StyleProvider, Header, Title, Accordion, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet " }
];

import { YellowBox } from 'react-native'
import ajax from '../../ajax'

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed. Maybe https://github.com/GeekyAnts/NativeBase/issues/2947 will help.
])


export default class Strategies extends Component {



  render() {
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Header>
          <Body>
            <Title>Options</Title>
          </Body>
        </Header>
        <Content>
          <Button hasText transparent onPress={ajax.signOut}>
              <Text>Switch User</Text>
          </Button>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}