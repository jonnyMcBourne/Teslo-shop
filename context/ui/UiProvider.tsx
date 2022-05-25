import { FC, PropsWithChildren, useReducer } from 'react'
import { UiContext, UiReducer } from './' 

export interface UiState{
    isMenuOpen:boolean
}
export const UiState : UiState ={
    isMenuOpen:false
}
export const UiProvider:FC<PropsWithChildren<{}>> = ({children}) => {
const [state, dispatch] = useReducer(UiReducer, UiState)

const toogleSideMenu = () =>{
    dispatch({type: '[UI] - ToogleMenu'})
}

  return (
    <UiContext.Provider value={{...state,
    //methods
    toogleSideMenu
    }} >
      {children}
    </UiContext.Provider>
  )
}