import { CHANGE_NAME, 
         CHANGE_WORKPLACE, 
         SUCCESSFUL, 
         UNSUCCESSFUL, 
         SEARCH_CUSTOMER, 
         CHANGE_IMAGE,
         DELETE_CUSTOMER_FAIL,
         DELETE_CUSTOMER_SUCCESSFUL,
         ON_BACK_IMG_PICKER,
         SEARCH_CLIENTE_VALUE,
         SEARCH_VALUE_MODAL,
         CHANGE_DECRIPTION_MODAL,
         CHANGE_VALUE_MODAL
    } from './types';
import firebase from 'firebase';

export const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        payload: name
    }
}
///////////////////////////////////////////////////////////////////////////////////////
export const changeWorkplace = (workplace) => {
    return {
        type: CHANGE_WORKPLACE,
        payload: workplace
    }
}
///////////////////////////////////////////////////////////////////////////////////////
export const saveData = ({ name, workplace, avatarSource }) => {    
    if(name == '' || workplace == ''){
        return userUnsuccessful();
    }
    return dispatch => {
           firebase.database().ref(`/clientes/${name}`)
                .set({ 
                    name: name, 
                    workplace: workplace,
                    avatarSource,
                    values: {
                        value0:{
                            value: 0,
                            description: '',
                            name: name,
                            key:'value0' 
                        },
                        value1:{
                            value: 0,
                            description: '',
                            name: name,
                            key:'value1'
                        },
                        value2:{
                            value: 0,
                            description: '',
                            name: name,
                            key:'value2'
                        },
                        value3: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value3'
                        },
                        value4: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value4'
                        },
                        value5: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value5'
                        },
                        value6: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value6'
                        },
                        value7:{
                            value: 0,
                            description: '',
                            name: name,
                            key:'value7'
                        },
                        value8: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value8'
                        },
                        value9: {
                            value: 0,
                            description: '',
                            name: name,
                            key:'value9'
                        },
                    },
                    total: 0.00
                })

                .then(value => userSuccessful(dispatch, value))
    }
}
const userSuccessful = (dispatch, value) => {
    dispatch ({ type: SUCCESSFUL, payload: value });
}
const userUnsuccessful = () => {
    return {
        type: UNSUCCESSFUL
    }
}
///////////////////////////////////////////////////////////////////////////////////////
export const searchCliente = () => {
    return dispatch => {
        firebase.database().ref('/clientes/')
            .once('value', snapshot => {
                dispatch({
                    type: SEARCH_CUSTOMER,
                    payload: snapshot.val()
                })
            });
    }
}
///////////////////////////////////////////////////////////////////////////////////////
export const searchClienteValue = (name) => {    
    return dispatch => {
        firebase.database().ref(`/clientes/${name}/values`)
            .on('value', snapshot => {
                dispatch({
                    type: SEARCH_CLIENTE_VALUE,
                    payload: snapshot.val()
                })
            });
    }
}

///////////////////////////////////////////////////////////////////////////////////////
export const changeImage = (source, name) => {
    return dispatch =>{
        firebase.database().ref('/clientes/'+ name +'/').update({
            "avatarSource":source 
        })
        .then(changeImageSuccessful(dispatch, source))
        .catch(erro => changeImageFailed(dispatch, erro))
    }
}
const changeImageSuccessful = (dispatch, source) => {
    dispatch({
        type: CHANGE_IMAGE,
        payload: source
    })
}
const changeImageFailed = (dispatch, erro) => {
    console.log(erro);
}
    
///////////////////////////////////////////////////////////////////////////////////////
export const deleteCliente = (name) => {
    return dispatch => {
        firebase.database().ref('/clientes/'+ name +'/')
            .remove()
            .then(deleteSuccefful(dispatch))
            .catch(erro => deleteFailed (erro, dispatch));
    }
}
const deleteSuccefful = (dispatch) => {
    dispatch({
        type: DELETE_CUSTOMER_SUCCESSFUL,
    })
}
const deleteFailed = (erro, dispatch) => {
    console.log(erro);
    dispatch({
        type: DELETE_CUSTOMER_FAIL,
        payload: erro
    })
}
///////////////////////////////////////////////////////////////////////////////////////
export const onBackImgPicker = () => {
    return {
        type: ON_BACK_IMG_PICKER
    }
}
///////////////////////////////////////////////////////////////////////////////////////
//somente busca os valores para um nova inserção, pois senão esses valores não são levados
//no momento que o modal abre
export const searchValueModal = () => {
    return {
        type: SEARCH_VALUE_MODAL
    }
}

export const changeValueModal = (value) => {
    
    return {
        type: CHANGE_VALUE_MODAL,
        payload: value
    }
}

export const changeDescriptionModal = (text) => {
    return {
        type: CHANGE_DECRIPTION_MODAL,
        payload: text
    }
}

export const saveItem = ({ text, value, nameCustomer, key }) => {
    console.log(`text = ${text}, value = ${value} e name = ${nameCustomer} e keyValue= ${key}`);


    //Formatando o valor de value;
   value = value.replace('R$', '');
   value = value.replace(',', '.');
   value = parseFloat(value);

    return dispatch => {
           firebase.database().ref(`/clientes/${nameCustomer}/values/`)
                .update({ 
                        [key]:{
                            description: text,
                            key: key,
                            name:nameCustomer,
                            value: value                            
                        }
                })

                .then(value => console.log('Deu Certo!'))
                .catch(erro => console.log('Deu Errado!', erro))
    }    
}
///////////////////////////////////////////////////////////////////////////////
export const deleteItem = ({ nameCustomer }) => {

    return dispatch => {
           firebase.database().ref(`/clientes/${nameCustomer}/values/`)
                .update({ 
                        [key]:{
                            description:'',
                           // key: [key],
                            name:nameCustomer,
                            value: 0                            
                        }
                })

                .then(value => console.log('Deu Certo!'))
                .catch(erro => console.log('Deu Errado!', erro))
    }    
}
///////////////////////////////////////////////////////////////////////////////
export const deleteAll = ( nameCustomer ) => {
    return dispatch => {
           firebase.database().ref(`/clientes/${nameCustomer}/values/`)
                .update({ 
                    value0:{
                        value: 0,
                        description: '',
                        name: '',
                        key:'value0' 
                    },
                    value1:{
                        value: 0,
                        description: '',
                        name: '',
                        key:'value1'
                    },
                    value2:{
                        value: 0,
                        description: '',
                        name: '',
                        key:'value2'
                    },
                    value3: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value3'
                    },
                    value4: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value4'
                    },
                    value5: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value5'
                    },
                    value6: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value6'
                    },
                    value7:{
                        value: 0,
                        description: '',
                        name: '',
                        key:'value7'
                    },
                    value8: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value8'
                    },
                    value9: {
                        value: 0,
                        description: '',
                        name: '',
                        key:'value9'
                    },
                })

                .then(value => console.log('Deu Certo!'))
                .catch(erro => console.log('Deu Errado!', erro))
    }    
}