import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { colorsList } from '../styles/colorList';

interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  selectedColor: string; 
}

const  ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect, selectedColor }) => {
  const [hoveredBox, setHoveredBox] = useState('');

  const handleClick = (key: string) => {
    onColorSelect(key);
  };

  const handleMouseEnter = (key: string) => {
    setHoveredBox(key);
  };

  const handleMouseLeave = () => {
    setHoveredBox('');
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (hoveredBox !== '') {
      const colors = colorsList[hoveredBox];
      let colorIndex = 0;

      intervalId = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        const innerBox = document.getElementById(`inner-box-${hoveredBox}`);
        if (innerBox) {
          innerBox.style.backgroundColor = colors[colorIndex];
        }
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [hoveredBox]);

  return (
    <Grid container spacing={1}>
      {Object.entries(colorsList).map(([key, colors]) => (
        <Grid item xs={4} key={key}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 150,
              height: 80,
              borderRadius: 8,
              cursor: 'pointer',
              border: selectedColor === key ? '2px solid black' : 'none',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => handleClick(key)}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              id={`inner-box-${key}`}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: colors[0],
                borderRadius: 4,
                margin: '0 8px',
                transition: 'background-color 0.3s ease',
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                alignSelf: 'center',
                marginLeft: '8px',
              }}
            >
              {key}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPalette;
