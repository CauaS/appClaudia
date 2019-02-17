import React,  { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { excluir } from '../components/img/imgs';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/actionFirebase';


class DeleteJobItem extends Component {
    componentDidMount(){
    }
    render(){        
        return(
            <TouchableOpacity onPress={() => this.props.deleteItem(this.props.name)}>   
                <View style={styles.buttonRight}>
                    <Image source={excluir} style={{resizeMode: 'contain', height: 40, width: 40 }}/>
                </View>                
            </TouchableOpacity>
        )
    }
}

export default connect(
    null, { 
        deleteItem
     }
)(DeleteJobItem);

const styles = StyleSheet.create({
    buttonRight: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40, width: 60
      },
})