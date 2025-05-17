import { CommonInvDetailModel } from "../../../CommonComp/CommonInvDetail/Model/CommonInvDetailModel";

export interface StockIssueDetail extends CommonInvDetailModel {
    code: string;
    sno: number;
  
    issueQty: number;
    receivedQty: number;
  
    fromStoreId: string;
    fromStoreName?: string; // [NotMapped], optional
  
    toStoreId: string;
    toStoreName?: string; // [NotMapped], optional
    locId?: string; // [NotMapped], optional
  }