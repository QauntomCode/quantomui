// EmployeeProfileView.tsx
import React from "react";
import {
  BasicKeysProps,
  MenuComponentProps,
  setFormBasicKeys,
} from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";
import { CommonCodeName } from "../../../../../database/db";
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView";
import {
  EmployeeInsert,
  EmployeeDelete,
  EmployeeGetOne,
  EmployeeGetAll,
} from "../Impl/employeesImpl";
import { EmployeeModel, VmEmployee,EmployeeLocation } from "../model/EmployeeModel";
import { DepartmentsGetAll } from "../../department/Impl/Department";
import { DesignationGetAll } from "../../designation/Impl/Designations";
import {
  RegisterAccountGetAll,
  RegisterAccountGetCodeName,
} from "../../../../account/config/registerAccount/impl/registerAccountIml";
import { EmployeeList } from "./EmployeeProfileList";
import { LocationComponent } from "../../../../Settings/Location/Views/LocationsView";
import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";
import { GetLocationsByUserId } from "../../../../Settings/Location/impl/LocationImpl";
import CommonListComp from "../../../../Settings/Location/Views/CommonListCom";


export const EmployeeProfileView = (props?: MenuComponentProps<VmEmployee>) => {

  const [allLocations, setAllLocations] = React.useState<LocationModel[]>([]);
  const [textSearch, setTextSearch] = React.useState("");

  const handleLocations = async () => {
    let res = await GetLocationsByUserId();
    console.log("Stores Response:", res);
    setAllLocations([...(res ?? [])]);
  };

  React.useEffect(() => {
    handleLocations();
  }, []);

  // Locations functions
  const onItemChange = (item: LocationModel, isSelected: boolean) => {
    const oldLocations = props?.state?.locations ?? [];
    
    const updatedLocations = isSelected
      ? [...oldLocations, item] // add
      : oldLocations.filter((x) => x.LocId !== item.LocId); // remove
  
    if (props?.state) {
      props?.setState?.({
        ...props.state,
        locations: updatedLocations,
      });
    }
  };

  const OnAllItemChange = (location: LocationModel[]) => {
    if (props?.state?.employee) {
      props.setState?.({
        ...props.state,
        locations: [...location],
      });
    }
  };

  const handleReset = () => {
    if (!props?.state?.employee) return; // Or handle error if needed
  
    props?.setState?.({
      ...props.state,
      locations: [],
    });
  };


 React.useEffect(() => {
  if (!props?.state?.locations || props?.state?.locations.length < 1) {
    const { employee, SalaryTemplate } = props?.state ?? {};

    if (!employee) return; // If employee missing, do nothing (or handle differently)

    props?.setState?.({
      locations: [{ LocId: "001" }],
    });
  }
}, [props?.state]);



  const handleDepartments = async (): Promise<CommonCodeName[]> => {
    const res = await DepartmentsGetAll();
    const mAccounts = res?.map((item: any) => ({
      Code: item?.Code,
      Name: item?.Name,
    }));
    return Promise.resolve([...mAccounts]);
  };

  const handleDesignations = async (): Promise<CommonCodeName[]> => {
    const res = await DesignationGetAll();
    const mAccounts = res?.map((item: any) => ({
      Code: item?.Code,
      Name: item?.Name,
    }));
    return Promise.resolve([...mAccounts]);
  };

  const handleRegisterAccount = async (): Promise<CommonCodeName[]> => {
    const res = await RegisterAccountGetCodeName();
    const mAccounts = res?.map((item: any) => ({
      Code: item?.Code,
      Name: item?.Name,
    }));
    return Promise.resolve([...mAccounts]);
  };

  React.useEffect(() => {
    setFormBasicKeys<VmEmployee>({
      SaveMethod: (payload) => EmployeeInsert(payload),
      DeleteMethod: (payload) => EmployeeDelete(payload),
      GetOneMethod: (payload) => EmployeeGetOne(payload),
      uniqueKey: props?.UniqueId ?? "",
      baseProps: props ?? {},
      SetBasicKeys: () => ({ keyNoPropName: "EmpCode", keyDatePropsName: "" }),
    });
  }, [props]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      props?.setListComponent?.(<EmployeeList {...props} />);
    }, 500);
    return () => clearTimeout(timer);
  }, [props]);

  // // Transform EmployeeLocation[] to Location[] for available locations
  // const availableLocations: LocationModel[] = props?.state?.locations?.map((el) => ({
  //   LocId: el.LocId ?? "",
  //   LocName: el.LocName ?? "Unknown",
  // })) || [];

  // // Get selected locations (same as available if all are initially selected)
  // const selectedLocations: LocationModel[] = props?.state?.locations?.map((el) => ({
  //   LocId: el.LocId ?? "",
  //   LocName: el.LocName ?? "Unknown",
  // })) || [];

  // const handleLocationChange = (selected: LocationModel[]) => {
  //   if (!props?.state || !props.state.employee) return;

  //   const updatedLocations:LocationModel[] = selected.map((loc) => ({
  //     EmpCode: props?.state?.employee?.EmpCode ?? "",
  //     LocId: loc.LocId,
  //     LocName: loc.LocName,
  //     employee: props.state?.employee,
  //     location: loc,
  //   }));

  //   const updatedEmployee = {
  //     ...props.state,
  //     location: updatedLocations,
  //   };
  //   props?.setState?.(updatedEmployee);
  // };

  return (
    <GroupContainer Label="Employee Profile">
      <Quantom_Grid container spacing={0.5}>
        <Quantom_Grid item size={{ xs: 4, md: 3, lg: 2 }}>
          <Quantom_Input
            disabled
            label="Code"
            value={props?.state?.employee?.EmpCode ?? ""}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 8, md: 9, lg: 10 }}>
          <Quantom_Input
            label="Name"
            value={props?.state?.employee?.EmpName ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, EmpName: e.target.value },
              });
            }}
          />
        </Quantom_Grid>

        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Father Name"
            value={props?.state?.employee?.FName ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, FName: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_LOV1
            selected={{
              Code: props?.state?.employee?.registerAccount?.Code ?? "",
              Name: props?.state?.employee?.registerAccount?.Name ?? "",
            }}
            onChange={(des) => {
              props?.setState?.({
                ...props?.state!,
                employee: {
                  ...props?.state?.employee!,
                  GLCode: des?.Code,
                  registerAccount: {
                    ...props?.state?.employee?.registerAccount!,
                    Code: des?.Code,
                    Name: des?.Name,
                  },
                },
              });
            }}
            label="GL Code"
            uniqueKeyNo={props?.UniqueId ?? ""}
            FillDtaMethod={handleRegisterAccount}
            keyNo="GLCodeSet"
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_LOV1
            selected={{
              Code: props?.state?.employee?.designation?.Code ?? "",
              Name: props?.state?.employee?.designation?.Name ?? "",
            }}
            onChange={(des) => {
              props?.setState?.({
                ...props?.state!,
                employee: {
                  ...props?.state?.employee!,
                  DsgCode: des?.Code,
                  designation: {
                    ...props?.state?.employee?.designation!,
                    Code: des?.Code,
                    Name: des?.Name,
                  },
                },
              });
            }}
            label="Designation"
            uniqueKeyNo={props?.UniqueId ?? ""}
            FillDtaMethod={handleDesignations}
            keyNo="Designation"
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_LOV1
            selected={{
              Code: props?.state?.employee?.department?.Code ?? "",
              Name: props?.state?.employee?.department?.Name ?? "",
            }}
            onChange={(sel) => {
              props?.setState?.({
                ...props?.state!,
                employee: {
                  ...props?.state?.employee!,
                  DptCode: sel?.Code,
                  department: {
                    ...props?.state?.employee?.department!,
                    Code: sel?.Code,
                    Name: sel?.Name,
                  },
                },
              });
            }}
            label="Department"
            uniqueKeyNo={props?.UniqueId ?? ""}
            FillDtaMethod={handleDepartments}
            keyNo="DEPARTMENT"
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Email"
            value={props?.state?.employee?.Email ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, Email: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Address"
            value={props?.state?.employee?.Address ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, Address: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Cell No"
            value={props?.state?.employee?.CellNo ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, CellNo: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Salary"
            type="number"
            value={props?.state?.employee?.Salary ?? 0}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: {
                  ...props?.state?.employee!,
                  Salary: parseFloat(e.target.value) || 0,
                },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Salary Type"
            value={props?.state?.employee?.SalaryType ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, SalaryType: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="BP Code"
            value={props?.state?.employee?.BPCode ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, BPCode: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 6, md: 4 }}>
          <Quantom_Input
            label="Remarks"
            value={props?.state?.employee?.Remarks ?? ""}
            onChange={(e) => {
              props?.setState?.({
                ...props?.state!,
                employee: { ...props?.state?.employee!, Remarks: e.target.value },
              });
            }}
          />
        </Quantom_Grid>
        <Quantom_Grid item size={{ xs: 12 }}>
        {/* Location Selector */}
        <Quantom_Grid item size={{ xs: 12 }}>
          <CommonListComp
            items={allLocations}
            title="Select Location"
            onItemChange={onItemChange}
            onAllItemChange={OnAllItemChange}
            onReset={handleReset}
            GetLabelTextItems={(item: LocationModel) => item.LocName ?? ""}
            searchText={textSearch}
            onSearchTextChange={setTextSearch}
            SelectedItemsList={
              props?.state?.locations?.map(loc => ({
                LocId: loc.LocId ?? "",
              })) ?? []}
            selectionPredicate={(t) => {
              return props?.state?.locations?.some((x) => x.LocId === t?.LocId) ?? false;
            }}
          />
        </Quantom_Grid>

        {/* <LocationComponent
          empCode={props?.state?.employee?.EmpCode ?? ""}
          //employee={props?.state?.employee!}
          selectedLocations={props?.state?.locations ?? []}
          onChange={(updated) =>
            props?.setState?.({
              ...props?.state!,
              locations: updated,
            })
          }
        /> */}
        </Quantom_Grid>
      </Quantom_Grid>
    </GroupContainer>
  );
};