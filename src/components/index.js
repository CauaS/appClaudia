import React,  { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { singup, custumers } from './img/imgs';
import { Actions } from 'react-native-router-flux';

export default class App extends Component {    
    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.ViewOptions}>
                    <View style={styles.option}>
                        <TouchableOpacity 
                            style={styles.viewBackGItem}
                            onPress={() => Actions.Signup()}
                        >
                            <Image
                                style={{width: 100, height: 100}}
                                source={singup}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text}>Adicionar</Text>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity 
                            style={styles.viewBackGItem}
                            onPress={() => Actions.customer()}
                        >
                            <Image
                                style={{width: 100, height: 100}}
                                source={custumers}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text}>Visualizar</Text>
                    </View>
                </View>               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCB8F3'
    },
    ViewOptions: {
        flex: 2,
        borderWidth: 2,
        flexDirection:'row',
    },
    option: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center'        
    },
    viewBackGItem: {
        height: 135,
        width: 135,
        backgroundColor: 'white',
        borderRadius: 80,                
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    text:{
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    }
})