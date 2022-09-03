import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface authState {
    isLoggedIn: boolean;
    user?: IUser
}

const AUTH_INITIAL_STATE: authState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    useEffect(()=>{
        checkToken()
    },[]);

    const checkToken = async() =>{

        if(!Cookies.get('token')){return};
        
        try {
            const {data}= await tesloApi.get('/user/validate-token')
            const {user,token}= data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - logIn',payload:user})
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - logIn', payload: user });
            return true
        } catch (error) {
            return false
        }
    }

    const registerUser = async (email: string, name: string, lastName: string, password: string): Promise<{ hasError: boolean, message: string }> => {
        try {
            const { data } = await tesloApi.post('user/register', { name, lastName, password, email });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - logIn', payload: user });
            return { hasError: false, message: 'user registered successfully' }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const error = err as AxiosError
                return {
                    hasError: true,
                    message: error.message
                }
            }
            return {
                hasError: true,
                message: 'Error registring user, please try again'
            }

        }
    }

    return (
        <AuthContext.Provider value={
            {
                ...state,
                loginUser,
                registerUser,
            }}>
            {children}
        </AuthContext.Provider>
    )


}