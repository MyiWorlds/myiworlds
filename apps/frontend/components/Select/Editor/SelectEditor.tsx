import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Circle } from '@myiworlds/types';
import { FormControl, ListItemText } from '@material-ui/core';

interface Props {
  circle: Circle;
  setValue: (newValues: any) => void;
  fieldUi: Circle | null;
}

const SelectEditor: React.FunctionComponent<Props> = ({
  circle,
  setValue,
  fieldUi,
}) => {
  const [variant, setVariant] = React.useState(fieldUi || 'h1');

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value);
    console.log(circle);
    setVariant(event.target.value);
  };

  return (
    <>
      <ListItemText primary={circle.title} />

      <FormControl>
        <Select value={variant} onChange={handleChange}>
          {circle.data.items.map((item: string) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectEditor;
