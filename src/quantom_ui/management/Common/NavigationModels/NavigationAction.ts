import {
  FilterEntities,
  FilterType,
  QuantomFilter,
  ReportTemplates,
} from "../QuantomFilter/QuantomFilter"; //"../QuantomFilter/QuantomFilter";

export enum ActionType {
  LOAD_REPORT,
  GET_READY,
  GET_ONE,
}
export enum TimeFormate {
  DAY,
  MONT,
  YEAR,
}
export enum FormType {
  FORM,
  REPORT,
}
export interface NavigationAction {
  MenuCode?: string;
  ActionCaption?: string;
  FilterModal?: QuantomFilter;
  Action?: ActionType;
  FromDateDiff?: number;
  ToDateDiff?: number;
  TimeFormat?: TimeFormate;
  ReportTemplate?: ReportTemplates;
  SelectedReportString?: string;
  FormType?: FormType;
  FitlerType?: FilterEntities;
  KeyNo?: string;
  FilterEnt?: FilterEntities;
  PrepairFilterNames?: string[];
}

export interface NavigationActionInfo {
  MenuCode?: string;
  Actions?: NavigationAction[];
  EnabledFilters?: FilterType;
}
