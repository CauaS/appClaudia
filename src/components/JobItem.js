import React,  { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { searchClienteValue } from '../actions/actionFirebase';
import Swipeable from 'react-native-swipeable';
import DeleteJobItem from './deleteJobItem';

class JobItem extends Component {
    componentWillMount(){
        this.props.searchClienteValue(this.props.name);    
        this._criaFonteDeDados(this.props.values);      
    }
    componentWillReceiveProps(nextProps) {
        this._criaFonteDeDados(nextProps.values);
    }    
    _criaFonteDeDados( values) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });        
        this.fonteDeDados = ds.cloneWithRows(values);        
    }
    _renderRow(values){
                    
        const RIGHTBUTTONS = [
            <DeleteJobItem
                //key={ key }
                name={ values.name }
            />
        ];        
           if(values.value > 0){
            return(
                <View>
                    <Swipeable rightButtons={RIGHTBUTTONS}>
                        <View style={styles.viewItem}>
                            <Text style={styles.textDecription}>
                                {values.description}
                            </Text>
                            <Text style={styles.textValue}>
                                R$ {values.value}
                            </Text>
                        </View>
                    </Swipeable>
                </View>
            )
        }
        return null
    }
    
    render(){    
       return(
           <View>                 
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }
}
const mapStateToProps = state => {
    const values = _.map(state.firebaseSBD.values, item => { return { ...item } });
    return (
        {
            values: values
        }
        
    );
  }
export default connect(
    mapStateToProps, { 
        searchClienteValue
     }
)(JobItem);

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 13,
        borderBottomWidth: 1, 
        borderColor: '#CCC',   
    },
    textDecription: {
        fontSize: 20,
    },
    textValue: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonRight: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40, width: 60
      },
})