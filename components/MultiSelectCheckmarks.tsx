import React from 'react';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface MultiSelectCheckmarksProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[] | string) => void;
}

const MultiSelectCheckmarks: React.FC<MultiSelectCheckmarksProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleMultiSelectChange = (event: SelectChangeEvent<string[] | string>) => {
    const { value } = event.target;

    if (typeof value === 'string') {
      if (value === 'Everyone') {
        if (options.length === value.length) {
          onChange([]);
        } else {
          onChange(options);
        }
      } else {
        onChange([value]);
      }
    } else if (Array.isArray(value)) {
      onChange(value);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multi-select-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multi-select-checkbox-label"
        id="multi-select-checkbox"
        multiple
        value={value}
        onChange={handleMultiSelectChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.length === options.length ? 'Everyone' : selected.join(', ')
        }
        MenuProps={MenuProps}
      >
        <MenuItem value="Everyone">
          <Checkbox checked={value.length === options.length} />
          <ListItemText primary="Everyone" />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectCheckmarks;
