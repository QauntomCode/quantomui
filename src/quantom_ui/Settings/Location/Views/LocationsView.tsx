import React, { useEffect, useState } from "react";
import { LocationModel } from "../Model/LocationModel";
import { EmployeeLocation, EmployeeModel } from "../../../payroll/config/Emloyee/model/EmployeeModel";
import { GetLocationsByUserId } from "../impl/LocationImpl";

// Dummy locations data (can be fetched from API too)
const ALL_LOCATIONS: LocationModel[] = [
  { LocId: "1", LocName: "Lahore" },
  { LocId: "2", LocName: "Karachi" },
  { LocId: "3", LocName: "Islamabad" },
  { LocId: "4", LocName: "Peshawar" },
  { LocId: "5", LocName: "Multan" },
  { LocId: "6", LocName: "Quetta" },
  { LocId: "7", LocName: "Faisalabad" },
  { LocId: "8", LocName: "Rawalpindi" },
  { LocId: "9", LocName: "Gujranwala" },
  { LocId: "10", LocName: "Hyderabad" },
];


interface LocationComponentProps {
  empCode: string;
  //employee: EmployeeModel;
  selectedLocations: EmployeeLocation[]; // only selected ones (e.g. 2/10)
  onChange: (updated: EmployeeLocation[]) => void;
}

export const LocationComponent: React.FC<LocationComponentProps> = ({
  empCode,
  //employee,
  selectedLocations,
  onChange,
}) => {
  const [allLocations, setAllLocations] = useState<LocationModel[]>([]);

useEffect(() => {
  const fetchLocations = async () => {
    const locations = await GetLocationsByUserId();
    setAllLocations(locations);
  };

  fetchLocations();
}, []); 
    

  // useEffect(() => {
  //   // You could fetch from server here too.
  //   setAllLocations(ALL_LOCATIONS);
  // }, []);

  const isChecked = (locId?: string) =>
    !!locId && selectedLocations.some((item) => item.LocId === locId);

  const handleCheckboxChange = (loc: LocationModel, checked: boolean) => {
    if (!loc.LocId) return;

    const updated = checked
      ? [
          ...selectedLocations,
          {
            EmpCode: empCode,
            LocId: loc.LocId,
            LocName: loc.LocName,
            //employee: employee,
            //location: loc,
          },
        ]
      : selectedLocations.filter((item) => item.LocId !== loc.LocId);

    onChange(updated);
  };

  return (
    <div>
      <h3>Select Locations</h3>
      {allLocations.map((loc) => (
        <div key={loc.LocId}>
          <label>
            <input
              type="checkbox"
              checked={isChecked(loc.LocId)}
              onChange={(e) => handleCheckboxChange(loc, e.target.checked)}
            />
            {loc.LocName} ({loc.LocId})
          </label>
        </div>
      ))}
    </div>
  );
};
