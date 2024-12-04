import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";


export interface VoucherModel {
   VCode?: string;
   VDate?: Date;
   DirectVTrack?: string;
   VType?: string;
   VRefNo?: string;
   VRemarks?: string;
   UId?: string;
   FID?: string;
   TransTime?: Date;
   TransFormName?: string;
   TransNo?: string;
   MenuCode?: string;
   LocId?: string;
   location?: LocationModel;
   DayClosed?: boolean;
}

