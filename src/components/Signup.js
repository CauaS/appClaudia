import React, { Component } from 'react';
import { View, TouchableOpacity , StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { saveData, changeName, changeWorkplace } from '../actions/actionFirebase';
import { Fumi } from 'react-native-textinput-effects';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { singup_black } from './img/imgs';

class Signup extends Component {
    _saveData(){        
        const { name, workplace, avatarSource } = this.props; 

        if(this.props.status == true){
            this._message();
        }else{
            this.props.saveData({ name, workplace, avatarSource });
        }
    }
    _message(){
        if(this.props.status == true){
            return <Text style={styles.textMessage}> Campos nome e local de trabalho são obrigatórios</Text>
        }
        if(this.props.cadastroSucesso == true){
            return <Text style={styles.textMessage}> Usuário inserido com sucesso!</Text>
        }
        return null;
    }
    
    render() {
        return(
            <View style={styles.mainView}>                                
                <View style={styles.imageView}>
                    <Image 
                        style={styles.image}
                        source={singup_black}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.fieldView}>
                        <Fumi
                            label={'Nome'}
                            iconClass={SimpleLineIcons}
                            iconName={'user-female'}
                            iconColor={'#EFA9E6'}
                            iconSize={23}                                
                            labelStyle={{ color: '#EFA9E6' }}
                            inputStyle={{ color: '#EFA9E6' }}
                            onChangeText={name => this.props.changeName(name)}
                            value={this.props.name}
                        /> 
                        <Fumi
                            label={'Local de trabalho'}
                            iconClass={MaterialIcons}
                            iconName={'work'}
                            iconColor={'#EFA9E6'}
                            iconSize={23}
                            labelStyle={{ color: '#EFA9E6' }}
                            inputStyle={{ color: '#EFA9E6' }}                                
                            onChangeText={workplace => this.props.changeWorkplace(workplace)}
                            value={this.props.workplace}
                        />
                </View> 
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>        
                    <TouchableOpacity 
                        style={styles.buttonSignup}
                        onPress={() => this._saveData()}                     
                    >
                        <Text style={styles.textButton}>Cadastrar!</Text>
                    </TouchableOpacity>                        
                </View>
                <View style={styles.viewMensagem}>
                     {this._message()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return (
        {
            name: state.firebaseSBD.name,
            workplace: state.firebaseSBD.workplace,
            status: state.firebaseSBD.status,
            cadastroSucesso: state.firebaseSBD.cadastroSucesso,
            avatarSource: state.firebaseSBD.avatarSource
        }
    );
  }

export default connect(
    mapStateToProps, { 
        saveData,
        changeName, 
        changeWorkplace
     }
)(Signup);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
    },
    fieldView: {
        backgroundColor: 'white',
        marginTop: 20,
        paddingHorizontal: 5,
        paddingBottom: 20
    },
    buttonSignup: {
        borderColor: "#EFA9E6",
        borderWidth: 1,
        borderRadius: 80,
        backgroundColor: '#EFA9E6',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 45,
        elevation: 5
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white' 
    },
    image: {
        width: 100,
        height: 100
    },
    imageView: {
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMensagem: {
        marginHorizontal: 10,
        backgroundColor: 'black',
        borderRadius: 30,
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textMessage: {
        padding: 10,
        color: 'white'
    },
})