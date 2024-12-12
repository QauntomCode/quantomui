

export interface SetupFormModel {
    Code?: string;        // Represents the unique code of the SubAccount
    Name?: string;        // Represents the name of the SubAccount
    Active?:boolean;    // Foreign key linking to the MainAccount
}
export interface VMSetupForm{

  Type?:string;
  setup?:SetupFormModel;
}