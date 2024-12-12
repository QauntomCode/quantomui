export interface ConfigTransLog {
    Id?: number;
    TransNo?: string;
    MenuCode?: string;
    Pkey?: string;
    Log?: string;
    NameSpace?: string;
    // UserMenu?: Menu;
    FormName?: string;
    Amount?: number;
    AmountType?: string;
    BpCode?: string;
    BpName?:string;
    BpType?: string;
    BpLabel?: string;
    PreStateJson?: string;
    TTime?:Date;
}
