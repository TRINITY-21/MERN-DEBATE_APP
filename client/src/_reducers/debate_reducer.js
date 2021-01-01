import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CART_USER,
    DEBATE
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case DEBATE:
            return {...state, article: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case CART_USER:
            return {...state, CARTData: action.payload }
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }
}