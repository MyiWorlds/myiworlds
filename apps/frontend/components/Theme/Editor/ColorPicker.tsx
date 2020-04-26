import React, { useEffect, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface Props {
  colorValue: string;
  onChange: (newColor: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPickerContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      display: 'flex',
    },
    colorPicker: {
      margin: '0px auto',
    },
  }),
);

export default function ColorPicker({ colorValue, onChange }: Props) {
  const [currentColor, setCurrentColor] = useState(colorValue);
  const classes = useStyles();

  const handleColorChange = () => {
    if (currentColor !== colorValue) {
      const timer = setTimeout(() => {
        console.log('updating parent');
        onChange(currentColor);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(handleColorChange, [currentColor]);

  return (
    <div className={classes.colorPickerContainer}>
      <div className={classes.colorPicker}>
        <SketchPicker
          color={currentColor}
          onChange={(color: ColorResult) => setCurrentColor(color.hex)}
          disableAlpha={true}
        />
      </div>
    </div>
  );
}
