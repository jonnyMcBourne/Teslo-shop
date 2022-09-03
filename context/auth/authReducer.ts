import { IUser } from '../../interfaces';
import {authState} from './';

type AuthActionType = |{type:'[Auth] - logIn',payload:IUser}
|{type:'[Auth] - logOut'}

export const authReducer =(state:authState, action:AuthActionType):authState=>{
    switch (action.type) {
        case '[Auth] - logIn' :
            return {
                ...state,
                isLoggedIn:true,
                user:action.payload
            }
        case '[Auth] - logOut':
            return{
                ...state,
                isLoggedIn:false,
                user:undefined
            }
    
        default:
            return state
    }
}