import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';

import getTheme from '../../../../../native-base-theme/components';
import material from '../../../../../native-base-theme/variables/material';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler, View } from 'react-native';
import PropTypes from 'prop-types';
import EvalTab from './EvalTab';
import { Alert } from "react-native";
import Globals from '../../../../GlobalDefinitions'
import ajax from '../../../../ajax'

export default class Eval extends React.Component {


    static propTypes = {
        configuration: PropTypes.array.isRequired,
        defaultData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
        makeAware: PropTypes.func.isRequired,
        teamNumber: PropTypes.number.isRequired,
    }

    hasMadeAware = false

    onBack = () => {
        Alert.alert(
            'Continue without saving?',
            'If you go back, the fields will not be saved.',
            [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Continue',
                  onPress: () => {
                      ajax.removeScouterFromMatch(this.props.teamNumber, this.props.matchNumber);
                      this.props.onBack(); 
                  },
                },
            ],
            { cancelable: true },
          );
        
    }


    doNothing = () => {}

    getTab = (tabNumber) => {
        let tabDict = this.props.configuration[tabNumber];
        let title = Object.keys(tabDict)[0];
        let tab = tabDict[title];
        return [title, tab]
    }

    getTabTitle = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return title;
    }

    getTabBody = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return tab;
    }

    
    onUpdate = (key, value) => {
        this.props.makeAware(key, value)
        if (!this.hasMadeAware) {
            this.hasMadeAware = true
        }
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      componentWillUnmount() {
        this.backHandler.remove()
      }
    
      handleBackPress = () => {
        this.onBack()
        return true;
      }

    render () {
        if (this.props.configuration.length === 0) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <ActivityIndicator animating={true}/>
                    </Container>
                </StyleProvider>
            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <EvalTab tabConfig={this.getTabBody(0)} onUpdate={this.onUpdate}/>
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}
