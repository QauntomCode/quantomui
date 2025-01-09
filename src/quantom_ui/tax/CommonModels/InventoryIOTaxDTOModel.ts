import { TaxFormulaValuesModel } from "./TaxFormulaValuesModel";

export enum TAX_APPLICABLE_ON {LUMP_SUM,EACH_ITEM}

export enum TAX_TAX_IS {INCLUSIVE,EXCLUSIVE,}

export enum TAX_TAX_EFFECT {EXEMPTED,RECEIVED,PAID }

export interface InventoryIOTaxDTOModel {
    TaxTypeCode?: string;
    TaxTypeName?: string;
    TaxTypeAbbr?: string;
    ItemCode?: string;
    ItemName?: string;
    ItemSoldQty?: number;
    ItemSoldRate?: number;
    NetAmountBeforTax?: number;
    Priority?: number;
    TaxTypeDefinedRate?: number;
    TaxTypeDefinedAmount?: number;
    TaxTypeAppliedRate?: number;
    TaxTypeAppliedAmount?: number;
    AmountBeforeTax?: number;
    AmountAfterTax?: number;
    TaxAmount?: number;
    CustomSortNo?: number;
    TaxFormCode?: string;
    TaxFormula?: string;
    DiscountFormula?: string;
    TaxDiscount?: number;
    NetAmount?: number;
    FormulaValues?: TaxFormulaValuesModel[]; // [NotMapped]
    ApplicableOn?: TAX_APPLICABLE_ON; // [NotMapped]
    TaxEffect?: TAX_TAX_EFFECT; // [NotMapped]
    TaxIs?: TAX_TAX_IS; // [NotMapped]
    IsHandled?: boolean;
    Message?: string;
    AppliedSource?: string;
}
