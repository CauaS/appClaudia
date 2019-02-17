import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { searchValueModal, changeValueModal, changeDescriptionModal, saveItem, searchCliente } from '../actions/actionFirebase';

class ModalAddValue extends Component {
  constructor(props){
    super(props);

      this.state = {
        isModalVisible: true,
        valueKey:''
      };
  }
    

    componentWillMount() {
      this.props.searchValueModal();
    }

    _toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible })
      Actions.pop();
    };  

    _saveItem = () => {

      if(this.props.values.value0.value == 0){ var key = 'value0' }
      else if(this.props.values.value1.value == 0){ var key ='value1' }
      else if(this.props.values.value2.value == 0){ var key ='value2' }
      else if(this.props.values.value3.value == 0){ var key ='value3' }
      else if(this.props.values.value4.value == 0){ var key ='value4' }
      else if(this.props.values.value5.value == 0){ var key ='value5' }
      else if(this.props.values.value6.value == 0){ var key ='value6' }
      else if(this.props.values.value7.value == 0){ var key ='value7' }
      else if(this.props.values.value8.value == 0){ var key ='value8' }
      else if(this.props.values.value9.value == 0){ var key ='value9' }    
      
      console.log(eval(this.props.values.value1.value + this.props.values.value2.value));
      const { text, value, nameCustomer } = this.props;

      this.props.saveItem({ text, value, nameCustomer, key });
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this._toggleModal}>            
          </TouchableOpacity>
          <Modal 
            isVisible={this.state.isModalVisible}
            onSwipe={this._toggleModal}
            swipeDirection="down"
          >            
              <View style={styles.MainView}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}> Nova Arte! </Text>
                </View>               
                <View style={styles.viewDV}>               
                  <Text style={styles.descriptions}> Descrição </Text>
                  <TextInput
                     onChangeText={(text) => this.props.changeDescriptionModal(text)}
                     value={this.props.text}
                     multiline
                     autoFocus
                  />             
                  <Text style={styles.descriptions}> Valor: </Text>
                  <TextInputMask
                    onChangeText={value => this.props.changeValueModal(value)}
                    value={this.props.value}                   
                    type={'money'}
                    placeholder="R$"
                  /> 
                </View>
                <View style={styles.groupButtons}>
                  <TouchableOpacity 
                    onPress={() => this._saveItem()}
                    style={styles.buttons}  
                  >
                    <Text>Salvar!</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={this._toggleModal}
                    style={styles.buttons}  
                  >
                    <Text>Fechar!</Text>
                  </TouchableOpacity>
                </View> 
              </View>
          </Modal>
        </View>
      );
    }
  }
  const mapStateToProps = state => {
    console.log('state', state);
    return (
        {
          text: state.firebaseSBD.text,
          value: state.firebaseSBD.value,
          values: state.firebaseSBD.values
        }
        
    );
  }
export default connect(
    mapStateToProps, { searchValueModal, changeValueModal, changeDescriptionModal, saveItem, searchCliente }
)(ModalAddValue);


  const styles = StyleSheet.create({
    MainView: {
      flex: 1,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20
    },
    viewTitle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFA9E6'
    },
    title: {
      fontSize: 25
    },
    descriptions:{
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 10
    },
    viewDV: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
      borderColor: "#EFA9E6",
      borderWidth: 1,
      borderRadius: 80,
      backgroundColor: '#EFA9E6',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 35,
      elevation: 5,    
    },
    groupButtons: {
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingHorizontal: 10,
      marginTop: '110%'
    }
  })