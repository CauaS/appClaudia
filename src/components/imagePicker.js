import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { changeImage, deleteCliente, onBackImgPicker,searchCliente  } from '../actions/actionFirebase';
import _ from 'lodash';
import { TextMask } from 'react-native-masked-text';

class ImgPicker extends Component {
  componentWillUnmount(){
    this.props.onBackImgPicker();
    this.props.searchCliente();
}
_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3]
  });
  
  if (!result.cancelled) {
    this.props.changeImage(result.uri, this.props.name);
  }
};
_message(){
  if(this.props.delete_customer_successful == true){
      return <Text style={styles.textMessage}> Usuário deltado com sucesso</Text>
  }
  return null;
}
_sum(){
  const values = eval(this.props.amountValue.value0.value +
                 this.props.amountValue.value1.value +
                 this.props.amountValue.value2.value +
                 this.props.amountValue.value3.value +
                 this.props.amountValue.value4.value +
                 this.props.amountValue.value5.value +
                 this.props.amountValue.value6.value +
                 this.props.amountValue.value7.value +
                 this.props.amountValue.value8.value +
                 this.props.amountValue.value9.value) ;

                 console.log('values', values);
  return values;
}
render(){
  return(
    <View style={{ width:'100%', height: 220 }}>
      <View style={styles.viewInfoINW}>
        <View style={[ this.props.delete_customer_successful ? styles.ViewBackGroundGray: styles.ViewBackGround ]}/>        
        <View style={styles.imageProfile}>
            <Image 
              style={styles.avatar} 
              source={isNaN(this.props.imageProfile) ? { uri:this.props.imageProfile } : this.props.imageProfile}
            />
        </View>
        <View style={styles.ViewNW}>
          <Text style={styles.textName}>{this.props.name}</Text>
          <Text style={styles.textWorkplace}>{this.props.workplace}</Text>
          <TextMask
              value={this._sum()}
              type={'money'}
              style={styles.textValue}
          />
        </View>
      </View>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
            disabled={ this.props.delete_customer_successful ? true : false }
               style={[ this.props.delete_customer_successful ? styles.buttonDisable : styles.buttonsCD ]}
             onPress={() => this._pickImage()}
        >
          <Text>Alterar foto.</Text>
        </TouchableOpacity>
        <TouchableOpacity
            disabled={ this.props.amountValue.value0.value > 0 || this.props.delete_customer_successful ? true : false }
               style={[ this.props.amountValue.value0.value > 0 || this.props.delete_customer_successful ? styles.buttonDisable : styles.buttonsCD ]}
             onPress={() => this.props.deleteCliente(this.props.name)}
        >
          <Text>Excluir cliente.</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.viewMensagem}>
              {this._message()}
        </View>
      </View>
    );
  }
}
//
//retorna estatos do redux como sendo props do componente
const mapStateToProps = state => {
    return (
        {
            avatarSource: state.firebaseSBD.avatarSource,
            delete_customer_successful: state.firebaseSBD.delete_customer_successful
        }
    );
  }

export default connect(mapStateToProps, { changeImage, deleteCliente, onBackImgPicker, searchCliente })(ImgPicker);

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: 'white',
  },
  imageProfile: {
    margin: 10
  },
  buttonsCD: {
    borderColor: "#EFA9E6",
    borderWidth: 1,
    borderRadius: 80,
    backgroundColor: '#EFA9E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 35,
    elevation: 5,    
  },
  buttonDisable: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 80,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 35,
    elevation: 5,    
  },
  viewInfoINW: {
    flexDirection: 'row',
    paddingTop: 10
  },
  ViewNW: {
    width: '100%',
    marginLeft: 25,
    paddingTop: 15 
  },
  textName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 7
  },
  textWorkplace: {
    fontSize: 15
  },
  textValue:{
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  ViewBackGround: {
    width: '100%',
    height: 100,
    backgroundColor: '#EFA9E6',    
    position: 'absolute'
  },
  ViewBackGroundGray: {
    width: '100%',
    height: 100,
    backgroundColor: 'gray',    
    position: 'absolute'
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 10
  },
  textMessage: {
    padding: 10,
    color: 'white'
},
viewMensagem: {
  marginHorizontal: 10,
  backgroundColor: 'black',
  borderRadius: 30,
  marginTop: 270,
  alignItems: 'center',
  justifyContent: 'flex-end'
},
});

