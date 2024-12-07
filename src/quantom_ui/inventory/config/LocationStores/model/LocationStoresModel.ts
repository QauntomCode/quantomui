import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";

export interface LocationStoresModel {
    StoreId?: string;
    StoreName?: string;
    LocId?: string;
    InActive?: boolean;
    Location?: LocationModel | null;
}
