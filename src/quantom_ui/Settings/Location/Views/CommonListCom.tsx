import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Quantom_Grid,Quantom_Input } from "../../../../quantom_comps/base_comps";
import {Typography, Paper,Checkbox ,IconButton, Tooltip,  Divider} from "@mui/material";
import SelectAllIcon from "@mui/icons-material/SelectAll";


type CommonListProps<T> = {
  title?: string; 
  items: T[]; 
  onItemChange?: (item: T, isSelected: boolean) => void;
  onAllItemChange?: (items: T[]) => void;
  onReset?: () => void; 
  GetLabelTextItems: (item: T) => string; 
  searchText?: string;
  onSearchTextChange?: (searchText: string) => void;
  SelectedItemsList?: T[];
  selectionPredicate?: (t?: T) => boolean;
};

const CommonListComp = <T,>(props: CommonListProps<T>) => {
  
  const [isActive, setIsActive] = React.useState(false);

  const handleIconClick = () => {
    if (isActive) {
      handleReset(); // Call handleReset when deactivated
    } else {
      handleSelectAll(); // Call handleSelectAll when activated
    }
    setIsActive(!isActive); // Toggle active state
  };

  // Filter items based on the search query
  const filteredItems = useMemo(
    () =>
      props?.items
        .filter((item) => {
          const itemString = JSON.stringify(item).toLowerCase();
          return itemString.includes(props?.searchText?.toLowerCase?.() ?? "");
        })
        .sort((a, b) => {
          const aSelected = props?.selectionPredicate?.(a) ? 1 : 0;
          const bSelected = props?.selectionPredicate?.(b) ? 1 : 0;
          return bSelected - aSelected;
        }),
    [props?.items, props?.searchText, props?.selectionPredicate]
  );

  // Handle individual item selection
  const handleSelectItem = (item: T) => {
    const isSelected = props?.selectionPredicate?.(item) ?? false;
    props?.onItemChange?.(item, !isSelected);
  };

  // Handle select all items
  const handleSelectAll = () => {
    props?.onAllItemChange?.(filteredItems);
  };

  // Handle reset selection
  const handleReset = () => {
    props?.onReset?.();
  };

  return (
    <Quantom_Grid
      container
      style={{ padding: 8, backgroundColor: "transparent" }}
    >
      {props?.title && (
        <Quantom_Grid item size={{ xs: 12 }}>
          <Typography
              variant="h6"
              sx={{
                m: 1, // shorthand for margin: 8px
                fontSize: '15px',
              }}
            >
              {props?.title}
          </Typography>
        </Quantom_Grid>
      )}

      {(props?.onSearchTextChange ||
        props?.onItemChange ||
        props?.onReset) && (
        <Quantom_Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ marginBottom: "15px" }}
        >
          {(props?.onAllItemChange || props?.onReset) && (
            <Quantom_Grid item size={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }}>
              <Quantom_Grid container spacing={1} style={{ marginTop: "4px" }}>
                <Tooltip
                  title={isActive ? "Deselect All" : "Select All"}
                >
                  <IconButton
                    style={{
                      color: '#fafafa', // example for grey[50]
                      backgroundColor: isActive ? '#90caf9' : '#eeeeee', // primary.light vs grey[200]
                    }}
                    onClick={handleIconClick}
                  >
                    <SelectAllIcon
                    style={{
                      color: isActive ? "" : '#1976d2', // Replace with desired color
                    }}
                  />
                    </IconButton>
                </Tooltip>
              </Quantom_Grid>
            </Quantom_Grid>
          )}
          {props?.onSearchTextChange && (
            <Quantom_Grid item size={{ xs: 10, sm: 9, md: 9, lg: 8, xl: 8 }}>
              <Quantom_Input
                label="Search"
                size="small"
                value={props?.searchText}
                onChange={(e) => props?.onSearchTextChange?.(e.target.value)}
              />
            </Quantom_Grid>
          )}
        </Quantom_Grid>
      )}

      {/* List of Items */}
      <Quantom_Grid item size={{ xs: 12 }}>
          <Quantom_Grid container spacing={1}>
            {filteredItems.map((item, index) => (
              <Quantom_Grid item size={{ xs: 12 }} key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                  }}
                >
                <Checkbox
                  checked={props?.selectionPredicate?.(item)}
                  onChange={() => handleSelectItem(item)}
                  color="primary"
                  aria-label={`Select item ${index}`}
                  sx={{
                    color: '#1976d2',
                    transform: 'scale(0.90)',
                    '&.Mui-checked': {
                      color: '#1976d2',
                    },
                  }}
                />
                  <>{props?.GetLabelTextItems?.(item)}</>
                </div>
              </Quantom_Grid>
            ))}
          </Quantom_Grid>
      </Quantom_Grid>
    </Quantom_Grid>
  );
};

export default CommonListComp;