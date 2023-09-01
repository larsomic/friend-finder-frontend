import React, { ReactNode } from 'react';
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
  onChange: (value: string[]) => void;
  disabled: boolean;
}

const MultiSelectCheckmarks: React.FC<MultiSelectCheckmarksProps> = ({
  label,
  options,
  value,
  onChange,
  disabled
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>, child: ReactNode) => {
    const selectedValues = event.target.value as string[];

    if (selectedValues.includes('Everyone')) {
      if (selectedValues.length === options.length + 1) {
        setSelectedOptions([]); // Deselect all options
        onChange([]); // Notify parent component
      } else {
        setSelectedOptions(options); // Select all options
        onChange(options); // Notify parent component
      }
    } else {
      setSelectedOptions(selectedValues); // Update selected options
      onChange(selectedValues); // Notify parent component
    }
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multi-select-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multi-select-checkbox-label"
        id="multi-select-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleMultiSelectChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.length === options.length ? 'Everyone' : (selected as string[]).join(', ')
        }
        disabled={disabled}
      >
        <MenuItem value="Everyone">
          <Checkbox checked={selectedOptions.length === options.length} />
          <ListItemText primary="Everyone" />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectCheckmarks;
