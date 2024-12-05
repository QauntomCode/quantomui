import { configureStore } from '@reduxjs/toolkit'
import  { ComponentSettings, create_initial_state, FontSettings, formsSlice, open_new_menu, QuantomFormState, remove_menu_by_index, set_save_method, set_state } from './reduxSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppContainerModel } from '../quantom_comps/AppContainer/Model/AppContainerModel'
import { AppContainerMenus } from '../quantom_comps/AppContainer/Model/AppContainerModelMenus'
import { Theme } from '@mui/material'
import { LocationModel } from '../quantom_ui/Settings/Location/Model/LocationModel'


const store=configureStore({
    reducer:{
       formsState:formsSlice.reducer,
       
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//export const useAppDispatch = (increment: unknown) => useDispatch<AppDispatch>() //This is used to perform action
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const form_state_selector = <T>(state: RootState, key: string): T | undefined => {
    let object= state.formsState.FormsState?.find(x => x.stateKey === key)?.QuantomFormCoreState;
    return object;
};
export const get_component_settings = <T>(state: RootState, key: string): ComponentSettings => {
    let object= state.formsState.FormsState?.find(x => x.stateKey === key)?.compSettings;
    // alert('settings value is'+object?.wWillHideToolbar)
    return object??{};
};
export const full_component_state = <T>(state: RootState, key: string): QuantomFormState<T> | undefined => {
    let object= state.formsState.FormsState?.find(x => x.stateKey === key);
    return object;
};

export const get_open_menus=(state?:RootState):AppContainerModel=>{
     let model= state?.formsState?.OpenMenus;
     return model??{};
}

export const get_current_user_locations=(state?:RootState):LocationModel[]=>{
    let locs= state?.formsState?.UserLocations;
    return locs??[];
}

//const dispatch= useAppDispatch();
export const set_form_state=<T>(stKey?:string,state?:T)=>{
    let object:QuantomFormState<any>={stateKey:stKey,QuantomFormCoreState:state}
    store.dispatch(set_state(object));
}
export const set_initial_state=<T>(stKey?:string)=>{
    let object:QuantomFormState<any>={stateKey:stKey,QuantomFormCoreState:{}}
    store.dispatch(create_initial_state(object));
}

export const append_open_menu=(menu?:AppContainerMenus)=>{
    store.dispatch(open_new_menu(menu))
}
export const remove_menu=(index?:number)=>{
    store.dispatch(remove_menu_by_index(index))
}

export const get_component_selected_locations=(state:RootState,uniqueId?:string)=>{
    return state?.formsState?.FormsState?.find(x=>x.stateKey===uniqueId)?.Location
}



export const useQuantomFonts=(state?:RootState):FontSettings=>{
    // console.log('state is ',state)
    // let model= state?.formsState?.Font;
    // return model??{};

    return {
        H1FontSize:'20px',
        H2FontSize:'18px',
        H3FontSize:'16px',
        H4FontSize:'13px',
        RegularFont:'roboto',
        HeaderFont:'kanit',
        RegularFontSize:'12px'
      }

}


export const useHoverStyle=(theme?:Theme)=>{
     let hoverStyle= {
        backgroundColor:theme?.palette?.primary?.main,
        color:theme?.palette?.info.light,
      }

    return hoverStyle;
}




export default store
