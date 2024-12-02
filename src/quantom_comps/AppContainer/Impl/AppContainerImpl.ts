
import { AppContainerModel } from "../Model/AppContainerModel";
import { AppContainerMenus } from "../Model/AppContainerModelMenus";


export const GetAllMenus=async():Promise<AppContainerMenus[]>=>{

    var res= Promise.resolve(TestingMenus)
    return res; 
}

export const GetMenuModel=async():Promise<AppContainerModel>=>{
     let menus= await GetAllMenus();
     let resModel:AppContainerModel={
        Menus:menus
     };

    return Promise.resolve(resModel);
}



const TestingMenus:AppContainerMenus[]=[
    {
        MenuCode:"2550001_001",
        MenuCaption:"First Menu",
        PKeyNo:"001"
    },
    {
        MenuCode:"2550001_002",
        MenuCaption:"Second Menu",
        PKeyNo:"001"
    },
    {
        MenuCode:"2550002_002",
        MenuCaption:"QUANTOM REPORTS",
        PKeyNo:"001"
    },
    {
        MenuCode:"ReportTest",
        MenuCaption:"Testing Report",
        PKeyNo:"001"
    }
]



