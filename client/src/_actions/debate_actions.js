import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CART_USER,
    DEBATE,
} from './types';

import { DEBATE_USER } from '../components/Config.js';
import { USER_SERVER } from '../components/Config.js';

export function debateUpload(dataToSubmit){
    const request = axios.post(`${DEBATE_USER}/add-debate-article`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: DEBATE,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function cart(dataToSubmit) {
    const request = axios.post('/api/cart/cartNum', dataToSubmit)
    .then(response => response.data);

    return {
        type:  CART_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}
