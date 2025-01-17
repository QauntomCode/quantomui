export interface InvoiceMasterValuesModel {
  BpCode?: string;
  BpType?: string;
  TaxForm?: string;
  EffectedDate?: Date;
  WillBypassTaxCaluclations?: boolean;
  InvoiceDiscount?: number;
  InvoiceScheme?: number;
}
