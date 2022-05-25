import { UiState } from "./UiProvider"


type UiActionType = | {type:'[UI] - ToogleMenu'}

export const UiReducer = (state = UiState, action:UiActionType) =>{
    switch (action.type) {
        case "[UI] - ToogleMenu":
        return {...state, isMenuOpen: !state.isMenuOpen  }
        
        default:
           return  UiState;
    }
}