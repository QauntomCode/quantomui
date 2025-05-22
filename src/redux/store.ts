import { configureStore } from "@reduxjs/toolkit";
import {
  ComponentSettings,
  create_initial_state,
  FontSettings,
  formsSlice,
  open_new_menu,
  QuantomFormState,
  remove_menu_by_index,
  set_save_method,
  set_selected_menu_index,
  set_state,
} from "./reduxSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppContainerModel } from "../quantom_comps/AppContainer/Model/AppContainerModel";
import { AppContainerMenus } from "../quantom_comps/AppContainer/Model/AppContainerModelMenus";
import { Theme } from "@mui/material";
import { LocationModel } from "../quantom_ui/Settings/Location/Model/LocationModel";

const store = configureStore({
  reducer: {
    formsState: formsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export const useAppDispatch = (increment: unknown) => useDispatch<AppDispatch>() //This is used to perform action
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const form_state_selector = <T>(
  state: RootState,
  key: string
): T | undefined => {
  let object = state.formsState.FormsState?.find(
    (x) => x.stateKey === key
  )?.QuantomFormCoreState;
  return object;
};
export const get_component_settings = <T>(
  state: RootState,
  key: string
): ComponentSettings => {
  let object = state.formsState.FormsState?.find(
    (x) => x.stateKey === key
  )?.compSettings;
  // alert('settings value is'+object?.wWillHideToolbar)
  return object ?? {};
};
export const full_component_state = <T>(
  state: RootState,
  key: string
): QuantomFormState<T> | undefined => {
  let object = state.formsState.FormsState?.find((x) => x.stateKey === key);
  return object;
};

export const get_open_menus = (state?: RootState): AppContainerModel => {
  let model = state?.formsState?.OpenMenus;
  return model ?? {};
};

export const get_current_user_locations = (
  state?: RootState
): LocationModel[] => {
  let locs = state?.formsState?.UserLocations;
  return locs ?? [];
};

//const dispatch= useAppDispatch();
export const set_form_state = <T>(stKey?: string, state?: T) => {
  let object: QuantomFormState<any> = {
    stateKey: stKey,
    QuantomFormCoreState: state,
  };
  store.dispatch(set_state(object));
};

export const set_initial_state = <T>(stKey?: string) => {
  let object: QuantomFormState<any> = {
    stateKey: stKey,
    QuantomFormCoreState: {},
  };
  store.dispatch(create_initial_state(object));
};

export const append_open_menu = (menu?: AppContainerMenus) => {
  store.dispatch(open_new_menu(menu));
};
export const remove_menu = (index?: number) => {
  store.dispatch(remove_menu_by_index(index));
  if (index === 0) {
    store.dispatch(set_selected_menu_index(1));
  } else {
    store.dispatch(set_selected_menu_index(index ?? 0 - 1));
  }
};

export const get_component_selected_locations = (
  state: RootState,
  uniqueId?: string
) => {
  return state?.formsState?.FormsState?.find((x) => x.stateKey === uniqueId)
    ?.Location;
};

export const get_selected_menu_Code = (state: RootState, uniqueId?: string) => {
  return state?.formsState?.OpenMenus?.Menus?.find(
    (x) => x.UniqueKeyNo === uniqueId
  )?.MenuCode;
};

export const get_selected_menu_index = (state: RootState) => {
  return state?.formsState?.SelectedMenu;
};

export const get_helperData_by_key = (
  state: RootState,
  uniqueId: string,
  keyNo: string
) => {
  return state?.formsState?.HelperData?.find(
    (x) => x.UniqueId === uniqueId
  )?.data?.find((y) => y.keyNo === keyNo)?.Data;
}; //FORM_CURRENT_LOCATION_SELECTED

export const getCurrentLocationWithStore = (
  uqId?: string
): Promise<LocationModel> => {
  let loc = store
    ?.getState()
    ?.formsState?.HelperData?.find((x) => x.UniqueId === uqId)
    ?.data?.find?.((x) => x.keyNo === "FORM_CURRENT_LOCATION_SELECTED")
    ?.Data as LocationModel;
  return Promise.resolve(loc);
};

export const GetHPD_WithOutStore = <T>(
  uqId?: string,
  keyNo?: string
): Promise<T> => {
  let loc = store
    ?.getState()
    ?.formsState?.HelperData?.find((x) => x.UniqueId === uqId)
    ?.data?.find?.((x) => x.keyNo === keyNo)?.Data as T;
  return Promise.resolve(loc);
};

export const useQuantomFonts = (state?: RootState): FontSettings => {
  // console.log('state is ',state)
  // let model= state?.formsState?.Font;
  // return model??{};

  return {
    H1FontSize: "20px",
    H2FontSize: "18px",
    H3FontSize: "16px",
    H4FontSize: "11px",
    RegularFont: "roboto",
    HeaderFont: "kanit",
    RegularFontSize: "12px",
  };
};

export const useHoverStyle = (theme?: Theme) => {
  let hoverStyle = {
    backgroundColor: theme?.palette?.primary?.main,
    color: theme?.palette?.info.light,
  };

  return hoverStyle;
};

export const get_form_state_without_selector = <T>(
  uniqueId?: string
): Promise<T> => {
  let obj = store
    .getState()
    .formsState?.FormsState?.find?.(
      (x) => x.stateKey === uniqueId
    )?.QuantomFormCoreState;
  return Promise.resolve(obj);
};

export const get_form_full_state_without_selector = <T>(
  uniqueId?: string
): Promise<QuantomFormState<T>> => {
  let obj: any = store
    .getState()
    .formsState?.FormsState?.find?.((x) => x.stateKey === uniqueId);
  return Promise.resolve(obj);
};

export const get_current_user_locations_with_out_selector = (): Promise<
  LocationModel[]
> => {
  let obj: any = store.getState().formsState?.UserLocations;
  return Promise.resolve(obj);
};
export default store;
