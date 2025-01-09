export interface TaxAggregationModel {
    INVOICE_INCLUSIVE_TAX_AMOUNT?: number;
    INVOICE_EXLUSIVE_TAX_AMOUNT?: number;
    LINE_TOTAL_INCLUSIVE_TAX_AMOUNT?: number;
    LINE_TOTAL_EXLUSIVE_TAX_AMOUNT?: number;

    TOTAL_INCLUSIVE_TAX_AMOUNT?: number;
    TOTAL_EXLUSIVE_TAX_AMOUNT?: number;

    INVOICE_TAX_DICOUNT_AMOUNT?: number;
    LINE_TOTAL_TAX_DISCOUNT_AMOUNT?: number;
    TOTAL_TAX_DISCOUNT_AMOUNT?: number;

    CustNTN?: string;
    CustSTRN?: string;

    CompNTN?: string;
    CompSTRN?: string;
}
