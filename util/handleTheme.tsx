import { colorsList } from '../styles/colorList'

const handleDarkMode = (darkMode: boolean) => {
    const style = getComputedStyle(document.documentElement);
    const color1 = style.getPropertyValue('--pColor1');
    const color2 = style.getPropertyValue('--pColor2');
    const color3 = style.getPropertyValue('--pColor3');
    const color4 = style.getPropertyValue('--pColor4');
    const color5 = style.getPropertyValue('--pColor5');
    if (darkMode){
      document.documentElement.style.setProperty('--color1', color5);
      document.documentElement.style.setProperty('--color2', color4);
      document.documentElement.style.setProperty('--color3', color3);
      document.documentElement.style.setProperty('--color4', color2);
      document.documentElement.style.setProperty('--color5', color1);
    }
    else {
      document.documentElement.style.setProperty('--color1', color1);
      document.documentElement.style.setProperty('--color2', color2);
      document.documentElement.style.setProperty('--color3', color3);
      document.documentElement.style.setProperty('--color4', color4);
      document.documentElement.style.setProperty('--color5', color5);
  }
}

const handleColorTheme = (colorTheme: string) => {
  document.documentElement.style.setProperty('--pColor1', colorsList[colorTheme][0]);
  document.documentElement.style.setProperty('--pColor2', colorsList[colorTheme][1]);
  document.documentElement.style.setProperty('--pColor3', colorsList[colorTheme][2]);
  document.documentElement.style.setProperty('--pColor4', colorsList[colorTheme][3]);
  document.documentElement.style.setProperty('--pColor5', colorsList[colorTheme][4]);
};  
  
export { handleDarkMode, handleColorTheme };