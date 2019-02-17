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
         ADD_VALUE,
         SEARCH_VALUE_MODAL,
         CHANGE_DECRIPTION_MODAL,
         CHANGE_VALUE_MODAL 
    } from '../actions/types';
import { userPhoto } from '../components/img/imgs';

const INITIAL_STATE = { 
   name: '',
   workplace: '',
   dadosCadastroUsuario: '',
   cadastroSucesso: false,
   customers: [],
   avatarSource: userPhoto,
   delete_customer_successful: false,
   delete_customer_fail:'',
   values: [],
   text:'',
   value:'',
}
export default (state = INITIAL_STATE, action) => {
    console.log(action);
    
    if (action.type == CHANGE_NAME) {
        return { ...state, name: action.payload, status: false}
    }
    if (action.type == CHANGE_WORKPLACE) {
        return { ...state, workplace: action.payload}
    }
    if (action.type == SUCCESSFUL) {
        return { ...state, workplace:'', name:'', cadastroSucesso: true, dadosCadastroUsuario: action.payload }
    }
    if (action.type == UNSUCCESSFUL) {
        return { ...state, status: true}
    }
    if (action.type == SEARCH_CUSTOMER) {
        return { customers: action.payload, avatarSource: userPhoto }
    }
    if (action.type == CHANGE_IMAGE) {
        return { ...state, avatarSource: action.payload}
    }
    if (action.type == DELETE_CUSTOMER_SUCCESSFUL) {
        return { ...state, delete_customer_successful: true}
    }
    if (action.type == DELETE_CUSTOMER_FAIL) {
        return { ...state, delete_customer_fail: action.payload}
    }
    if (action.type == ON_BACK_IMG_PICKER) {
        return { ...state, delete_customer_successful: false, avatarSource: userPhoto }
    }
    if (action.type == SEARCH_CLIENTE_VALUE) {
        return { ...state, values: action.payload }
    }
    if (action.type == SEARCH_VALUE_MODAL) {
        return { ...state, text: '', value: '' }
    }
    if (action.type == CHANGE_DECRIPTION_MODAL) {
        return { ...state, text:action.payload }
    }
    if (action.type == CHANGE_VALUE_MODAL) {
        return { ...state, value: action.payload }
    }
    return state;
}