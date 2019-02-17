import React,  { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ImgPicker from './imagePicker';
import FabButton from './FabButton';
import JobItem from './JobItem';

export default class customerProfile extends Component {

    render(){
        return(
            <View style={{flex:1}}>
               <ImgPicker 
                    name={this.props.title}
                    workplace={this.props.workplace}
                    amountValue={this.props.values}
                    imageProfile={this.props.imageProfile}
               />
               <View style={{flex:1}}>
                   <ScrollView>
                       <JobItem name={this.props.title}/>
                  </ScrollView>                   
                </View>                         
               <FabButton 
                    nameCustomer={this.props.title}
                />
            </View>
        )
    }
}