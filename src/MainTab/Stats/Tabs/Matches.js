import React from 'react';
import { Form, Container, Header, Separator, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';


import { FlatList, StyleSheet, SectionList, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../../ajax';
import Globals from '../../../GlobalDefinitions';

export default class Matches extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
    }

    componentDidMount() {
       this.refreshTeam();
    }

    state = {
        refreshing: false,
        statsData: null,
    }

    refreshTeam = async () => {
       let d = await ajax.fetchMatchDataForTeamInCompetition(Globals.data.competition, this.props.team);
       console.log(d);
       this.setState({statsData: d});
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.refreshTeam();
        this.setState({refreshing: false});
    }

    render() {
        if (this.state.statsData === null) {
            return (
                    <Container>
                        <ActivityIndicator animating={true}/>
                    </Container>
            );
        } else {
            return (
                    <Container>
                        <SectionList 
                            // ItemSeparatorComponent={<Separator/>} 
                            sections={this.state.statsData} 
                            renderSectionHeader={({ section }) => <Text>{section.name}</Text>} 
                            renderItem={({ item }) => <Text>{"Match "+item.match + ": "+item.val}</Text>} 
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                            }
                            keyExtractor={(item, index) => index} 
                        />
                    </Container>
            );
        }
    }
  }
  
  