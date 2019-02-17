import React from 'react';
import App from './components/index';
import Signup from './components/Signup';
import customer from './components/customer';
import customerProfile from './components/customerProfile';
import ModalAddValue from './components/ModalAddValue';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

export default props => (
    <Router>
        <Stack key = "root">
            <Scene 
                key= "App" 
                component={App} 
                title='Meu App'
                initial
            /> 
            <Scene 
                key= "Signup" 
                component={Signup} 
                title='Cadastro'
            />                       
            <Scene 
                key= "customer" 
                component={customer} 
                title='Clientes'
            />                       
            <Scene 
                key= "customerProfile" 
                component={customerProfile} 
                title='Perfil'
            />                       
            <Scene 
                key= "ModalAddValue" 
                component={ModalAddValue}
                hideNavBar
            />                       
        </Stack>
    </Router>
);

const styles = StyleSheet.create({ 
    navigationBarStyle: {
        backgroundColor: '#4B2D73', 
        zIndex: 100, 
        borderBottomWidth: 0, 
        elevation: 0,
        zIndex: 0

    }
})