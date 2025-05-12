import { CommonInvDetailModel } from "../../../CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { StockIssueDetail } from "./IssueDetail";

export interface StockIssue {
    Code?: string;
    IssueDate?: Date; // ISO date string (e.g., '2025-05-06')
    ReceiveDate?: string | null; // nullable ISO date string
    IsReceived?: boolean; // NotMapped property
  
    FromLocCode?: string;
    ToLocCode?: string;
    Remarks?: string;
    IId?: string;
    LocId?: string;
    Status?: string;

    FromLocCodeName?: string; // NotMapped
    ToLocName?: string; // NotMapped
    TransTime?: string; // DateTime => string
    DayClosed?: boolean; // NotMapped
  }
  

  export interface VmStockIssueReceive
    {
      stockIssue?:StockIssue 
      stockIssueDetails?:CommonInvDetailModel[]
  }