import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppContainerModel } from "../quantom_comps/AppContainer/Model/AppContainerModel";
import { AppContainerMenus } from "../quantom_comps/AppContainer/Model/AppContainerModelMenus";
import { BasicKeysProps } from "../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { HttpResponse } from "../HTTP/QuantomHttpMethods";
import { LocationModel } from "../quantom_ui/Settings/Location/Model/LocationModel";
import produce from "immer";

interface FormsState {
  FormsState?: QuantomFormState<any>[];
  OpenMenus?: AppContainerModel;
  Font?: FontSettings;
  UserLocations?: LocationModel[];
  SelectedMenu?: number;
  HelperData?: StateHelperDataMeta[];
}

export interface FontSettings {
  RegularFont?: string;
  HeaderFont?: string;
  H1FontSize?: string;
  H2FontSize?: string;
  H3FontSize?: string;
  H4FontSize?: string;
  RegularFontSize?: string;
}

export interface QuantomFormState<T> {
  stateKey?: string;
  recordKeyNo?: string;
  MenuCode?: string;
  FormId?: string;
  QuantomFormCoreState?: T;
  KeyValues?: (t?: T) => KeyValues;
  Location?: LocationModel;
  SaveMethod?: (payload?: T) => Promise<HttpResponse<T>>;
  init?: () => void;
  DeleteMethod?: (payload?: T) => Promise<HttpResponse<T>>;
  GetOneMethod?: (keyNo?: string) => Promise<HttpResponse<T>>;
  LocationInitMethod?: (location?: LocationModel) => void;
  SetBasicKeysMethod?: () => BasicKeysProps;
  AfterReset?: (location?: LocationModel) => void;
  compSettings?: ComponentSettings;
  listData?: unknown[];
  FormState?: "FORM" | "LIST";
  IsFirstUseEffectCall?: boolean;
}

interface StateHelperDataMeta {
  UniqueId?: string;
  data?: StateHelperDataData[];
}
interface StateHelperDataData {
  Data?: any;
  keyNo?: string;
}

interface StateHelperDataMetaSingleKeyPayload {
  UniqueId?: string;
  data?: StateHelperDataData;
}

export interface ComponentSettings {
  wWillHideToolbar?: boolean;
  WillHideUserLog?: boolean;
  willShowLocations?: boolean;
  firstControlId?: string;
}

export interface ComponentSettingsPayloadType {
  settings?: ComponentSettings;
  stateKey?: string;
}
export interface ComponentSelectedLocationPayloadType {
  Location?: LocationModel;
  stateKey?: string;
}
export interface ComponentPrimaryKeyPayloadType {
  keyNo?: string;
  stateKey?: string;
}

export interface ComponentFormStatePayloadType {
  FormState?: "FORM" | "LIST";
  stateKey?: string;
}
export interface ComponentListPropsPayloadType {
  ListData?: unknown[];
  stateKey?: string;
}
export interface SetFirstCallPayload {
  calledSuccessfully?: boolean;
  stateKey?: string;
}
export interface StateMethodPayloadType<T> {
  method?: (payLoad: T) => Promise<HttpResponse<T>>;
  stateKey?: string;
}

export interface LocationChangeMethodPayload {
  method?: (loc?: LocationModel) => void;
  stateKey?: string;
}

export interface StateMethodGetOnePayloadType<T> {
  method?: (keyNo?: string) => Promise<HttpResponse<T>>;
  stateKey?: string;
}

export interface setBasicKeysPayloadType {
  method?: () => BasicKeysProps;
  stateKey?: string;
}
interface KeyValues {
  KeyNo?: string;
  Date?: string;
}

const initialState: FormsState = {
  FormsState: [],
  OpenMenus: {
    Menus: [
      // {
      //   MenuCode: "001",
      //   MenuCaption: "All Menus",
      //   UniqueKeyNo: "INITIAL_STATE",
      // },
    ],
  },
  Font: {
    H1FontSize: "20px",
    H2FontSize: "18px",
    H3FontSize: "13px",
    H4FontSize: "10px",
    RegularFont: "monospace",
    HeaderFont: "Oswald",
    RegularFontSize: "14px",
  },
};

export const formsSlice = createSlice({
  name: "form_state",
  initialState,
  reducers: {
    set_state: (state, action: PayloadAction<QuantomFormState<any>>) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, ...action.payload }
          : formState
      );

      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },
    set_state_with_immmer: (
      state,
      action: PayloadAction<QuantomFormState<any>>
    ) => {
      const formIndex = state?.FormsState?.findIndex(
        (formState) => formState.stateKey === action.payload.stateKey
      );

      if (state && state?.FormsState && formIndex !== -1) {
        state.FormsState[formIndex ?? 0] = {
          ...state.FormsState[formIndex ?? 0],
          ...action.payload,
        };
      }
    },

    set_save_method: (
      state,
      action: PayloadAction<StateMethodPayloadType<any>>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, SaveMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_int_method: (
      state,
      action: PayloadAction<StateMethodPayloadType<any>>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, SaveMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_delete_method: (
      state,
      action: PayloadAction<StateMethodPayloadType<any>>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, DeleteMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_location_init_method: (
      state,
      action: PayloadAction<LocationChangeMethodPayload>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, LocationInitMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_after_reset_method: (
      state,
      action: PayloadAction<LocationChangeMethodPayload>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, AfterReset: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },
    set_get_one_method: (
      state,
      action: PayloadAction<StateMethodGetOnePayloadType<unknown>>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, GetOneMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_basic_keys_method: (
      state,
      action: PayloadAction<setBasicKeysPayloadType>
    ) => {
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, SetBasicKeysMethod: action?.payload?.method }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_component_settings: (
      state,
      action: PayloadAction<ComponentSettingsPayloadType>
    ) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, compSettings: { ...action?.payload?.settings } }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    change_first_call: (state, action: PayloadAction<SetFirstCallPayload>) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? {
              ...formState,
              IsFirstUseEffectCall: !action?.payload?.calledSuccessfully,
            }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },
    set_component_selected_locations: (
      state,
      action: PayloadAction<ComponentSelectedLocationPayloadType>
    ) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, Location: { ...action?.payload?.Location } }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_component_record_key: (
      state,
      action: PayloadAction<ComponentPrimaryKeyPayloadType>
    ) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, recordKeyNo: action.payload.keyNo }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },
    change_form_state: (
      state,
      action: PayloadAction<ComponentFormStatePayloadType>
    ) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, FormState: action?.payload?.FormState }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    set_list_data: (
      state,
      action: PayloadAction<ComponentListPropsPayloadType>
    ) => {
      // alert('setting value s'+action?.payload?.settings?.wWillHideToolbar)
      const updatedFormsState = state.FormsState?.map((formState) =>
        formState.stateKey === action.payload.stateKey
          ? { ...formState, listData: [...(action?.payload?.ListData ?? [])] }
          : formState
      );
      return {
        ...state,
        FormsState: updatedFormsState,
      };
    },

    create_initial_state: (
      state,
      action: PayloadAction<QuantomFormState<any>>
    ) => {
      let s = { ...state };
      let oldObj = s?.FormsState?.find(
        (x) => x.stateKey === action.payload.stateKey
      );

      if (!oldObj && action?.payload?.stateKey) {
        s = {
          ...s,
          FormsState: [
            ...(s?.FormsState || []),
            { ...action.payload, IsFirstUseEffectCall: true },
          ],
        };
        state = { ...s };
        return state;
      }
    },

    add_helper_data: (state, action: PayloadAction<StateHelperDataMeta>) => {
      let s = { ...state };
      let oldObj = s?.HelperData?.find(
        (x) => x.UniqueId === action.payload.UniqueId
      );

      if (!oldObj && action?.payload?.UniqueId) {
        s = {
          ...s,
          HelperData: [...(s?.HelperData ?? []), { ...action.payload }],
        };
        state = { ...s };
        return state;
      }

      if (oldObj) {
        oldObj = { ...action.payload };
        state = { ...s };
        return state;
      }
    },
    add_helper_data_single_key: (
      state,
      action: PayloadAction<StateHelperDataMetaSingleKeyPayload>
    ) => {
      // alert('inside helper data')
      let s = { ...state };
      let selectedCompData = s?.HelperData?.find(
        (x) => x.UniqueId === action?.payload?.UniqueId
      );
      if (!selectedCompData && action?.payload?.UniqueId) {
        // alert('inside helper data condition 1')
        s = {
          ...s,
          HelperData: [
            ...(s?.HelperData ?? []),
            {
              UniqueId: action?.payload?.UniqueId,
              data: [{ ...action?.payload?.data }],
            },
          ],
        };
        state = { ...s };
        return state;
      }
      console.warn("unique id is", action?.payload.UniqueId);
      console.warn("keyNo  is", action?.payload.data?.keyNo);

      console.warn("selected key data", selectedCompData);

      let selectedKeyData = selectedCompData?.data?.find(
        (x) => x.keyNo === action?.payload?.data?.keyNo
      );
      console.warn("selected key data", selectedKeyData);
      if (selectedCompData && !selectedKeyData) {
        // alert('inside helper data condition 2')
        let helperData = s?.HelperData?.map((item) =>
          item.UniqueId === action.payload.UniqueId
            ? {
                ...item,
                data: [
                  ...(item.data ?? []),
                  {
                    keyNo: action.payload.data?.keyNo,
                    Data: action?.payload?.data?.Data,
                  },
                ],
              }
            : item
        );
        return { ...state, HelperData: helperData };
      }
      if (selectedCompData && selectedKeyData) {
        // alert('inside helper data condition 3')
        let updatedHelperData: any = s?.HelperData?.map((item) =>
          item?.UniqueId === action.payload.UniqueId
            ? {
                UniqueId: action.payload.UniqueId,
                data: item?.data?.map((keyData) =>
                  keyData.keyNo === action.payload.data?.keyNo
                    ? action.payload.data
                    : keyData
                ),
              }
            : item
        );

        console.warn("helper data is", updatedHelperData);
        return { ...state, HelperData: [...(updatedHelperData ?? [])] };
      }
    },

    open_new_menu: (
      state,
      action: PayloadAction<AppContainerMenus | undefined>
    ) => {
      let s = { ...state };
      s.OpenMenus = {
        Menus: [...(s.OpenMenus?.Menus ?? []), { ...action?.payload }],
      };
      state = { ...s, SelectedMenu: (s.OpenMenus?.Menus?.length ?? 0) - 1 };
      return state;
    },
    remove_menu_by_index: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      let s = { ...state };
      let index = action.payload ?? -1;
      var menus = [...(s?.OpenMenus?.Menus ?? [])];
      let obj = menus?.[index];
      if (obj) {
        menus?.splice(index, 1);
      }
      console.log("menus are ", menus);

      //  alert('length is',menus?.length-1)
      state = {
        ...state,
        OpenMenus: { ...state.OpenMenus, Menus: [...menus] },
      };
      return state;
    },

    set_selected_menu_index: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state = { ...state, SelectedMenu: action.payload ?? 0 };
      return state;
    },

    set_user_locations: (state, action: PayloadAction<LocationModel[]>) => {
      state = { ...state, UserLocations: [...action?.payload] };
      return state;
    },
  },
});

export const {
  set_state,
  create_initial_state,
  open_new_menu,
  remove_menu_by_index,
  set_save_method,
  set_delete_method,
  set_get_one_method,
  set_basic_keys_method,
  set_component_settings,
  change_form_state,
  set_list_data,
  set_component_record_key,
  set_user_locations,
  set_component_selected_locations,
  set_location_init_method,
  set_after_reset_method,
  change_first_call,
  set_selected_menu_index,
  add_helper_data,
  add_helper_data_single_key,
  // set_state_with_immmer,
} = formsSlice.actions;

// const counterReducer = counterSlice.reducer //This is stored in the main store
