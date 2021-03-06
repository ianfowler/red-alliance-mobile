import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, Form, Textarea, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Segment from '../../../../native-base-theme/components/Segment';
import Stepper from './Stepper'

export default class EvalCell extends React.Component {

    static propTypes = {
        config: PropTypes.object.isRequired,
        cellUpdate: PropTypes.func.isRequired,
    };

    key = (() => this.props.config.key);
    name = (() => this.props.config.name);
    widget = (() => this.props.config.widget);
    options = (() => this.props.config.options);
 
    state = {
        selectedIndex: 0
    };

    handleIndexChange = (index) => {
        this.setState({
            selectedIndex: index
        });
        this.props.cellUpdate(this.key(), this.options()[index]);
    };
    
    handleGeneralChange = (num) => {
        this.props.cellUpdate(this.key(), num, true);
    };

    render () {

        switch (this.widget()) {
            case 'segment': 
                return (
                    <SegmentedControlTab 
                        tabStyle={styles.tabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        values={this.options()}
                        selectedIndex={this.state.selectedIndex} 
                        onTabPress={this.handleIndexChange}
                    />
                );

            case 'stepper':
                return (
                    <Stepper
                        style={styles.container}
                        labelBackgroundColor={Globals.colors[Globals.brand["primary"]]}
                        buttonsBackgroundColor={Globals.colors[Globals.brand["primary-dark"]]}
                        onChange={this.handleGeneralChange}
                    />
                );

            case 'text-area':
                return (
                    <Form style={styles.textarea}>
                       
                        <Item style={styles.textarea}>
                         <Textarea maxLength={650} style={styles.textarea} rowSpan={3} bordered placeholder={this.options()} onChangeText={this.handleGeneralChange} />
                        </Item>
                    </Form>
                );
            default:
                // TODO: Switch this to error.
                return (
                    <Text>{"Nothing for widget named: " + this.widget()}</Text>
                )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
      },
      stepper: {
        flex: 1,
      },
      tabStyle: {
        borderColor: Globals.colors[Globals.brand.primary],
      },
      activeTabStyle: {
        backgroundColor: Globals.colors[Globals.brand.primary],
      },
      tabTextStyle: {
        color: Globals.colors[Globals.brand.primary],
      },
      textarea: {
          flex: 1,
          flexDirection: 'row',
          
      }
  });