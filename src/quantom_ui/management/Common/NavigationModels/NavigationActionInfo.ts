import { FilterType } from "../QuantomFilter/QuantomFilter";
import { NavigationAction } from "./NavigationAction";

export interface NavigationActionInfo {
    MenuCode?: string;
    Actions?: NavigationAction[];
    EnabledFilters?: FilterType;
}


