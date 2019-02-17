import React,  { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { searchCliente } from '../actions/actionFirebase';
import _ from 'lodash';
import { Actions }from 'react-native-router-flux';
import { TextMask } from 'react-native-masked-text';

class customer extends Component {

    componentWillMount(){
        this.props.searchCliente();    
        this._criaFonteDeDados(this.props.customers);      
    }
    componentWillReceiveProps(nextProps) {
        this._criaFonteDeDados(nextProps.customers);
    }    
    _criaFonteDeDados( clientes ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });        
        this.fonteDeDados = ds.cloneWithRows(clientes);
    }
         
    _renderRow(cliente){
        const SUM = () => {
            var sum = cliente.values.value0.value+
                      cliente.values.value1.value+
                      cliente.values.value2.value+
                      cliente.values.value3.value+
                      cliente.values.value4.value+
                      cliente.values.value5.value+
                      cliente.values.value6.value+
                      cliente.values.value7.value+
                      cliente.values.value8.value+
                      cliente.values.value9.value;

                      console.log(sum);
         return sum;
        }
        return(
            <TouchableOpacity 
                onPress={ () => Actions.customerProfile({ title: cliente.name, 
                                                          name: cliente.name,
                                                          workplace: cliente.workplace,
                                                          imageProfile: cliente.avatarSource,
                                                          values: cliente.values,   
                                                        })}
            >
                <View style={styles.viewCliente}>
                    <View style={styles.viewImage}>
                        <Image
                            style={{ height: 55, width: 55 }}
                            source={isNaN(cliente.avatarSource) ? { uri:cliente.avatarSource } : cliente.avatarSource}
                        />
                    </View>
                    <View style={ styles.ViewNWV}>
                        <View style={styles.ViewNW}>
                            <Text style={styles.textName}>{cliente.name}</Text>
                            <Text style={styles.textWorkplace}>{cliente.workplace}</Text>
                        </View>
                        <View>
                        <TextMask
                            value={SUM()}
                            type={'money'}
                            style={styles.textValor}
                        />                            
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render(){
        return(
            <View style={styles.viewPrincipal}>
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
    const customer = _.map(state.firebaseSBD.customers, item => { return { ...item } });
    return (
        {
            customers: customer,
            avatarSource: state.firebaseSBD.avatarSource,
        }
        
    );
  }
export default connect(
    mapStateToProps, { 
        searchCliente,
     }
)(customer);

const styles = StyleSheet.create({
    viewCliente: {
        margin: 5,
        padding: 5,
        flexDirection:'row' 
    },
    viewPrincipal: {
        flex: 1,
        backgroundColor: 'white'
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    textWorkplace: {
        fontSize: 12
    },
    textValor: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewImage:{
        height: 55,
        width: 55,
        borderRadius: 50,
        marginRight: 15,
        overflow:'hidden'
    },
    ViewNW: {
        width: 190
    },
    ViewNWV: {        
        borderBottomWidth: 1, 
        borderColor: '#CCC',
        flexDirection:'row',
        paddingBottom: 8 
    }
})