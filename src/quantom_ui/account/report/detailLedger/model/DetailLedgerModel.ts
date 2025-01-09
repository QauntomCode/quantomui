
import { CommonInvDetailModel } from '../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel';
import {LedgerModel} from '../../Ledger/model/LedgerModel'
export interface DetailLedgerModel extends LedgerModel {
    InvoiceDetail?: CommonInvDetailModel[];
    ItemName?: string;
    UnitName?: string;
    Qty?: number;
    Price?: number;
    DisAmount?: number;
    Amount?: number;
    willShowDetail?:boolean;
}