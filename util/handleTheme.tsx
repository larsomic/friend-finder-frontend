const handleDarkMode = (darkMode: boolean) => {
    const style = getComputedStyle(document.documentElement);
    const color1 = style.getPropertyValue('--permanent-color-1');
    const color2 = style.getPropertyValue('--permanent-color-2');
    if (darkMode){
      document.documentElement.style.setProperty('--light-dark-color-1', color2);
      document.documentElement.style.setProperty('--light-dark-color-2', color1);
    }
    else {
      document.documentElement.style.setProperty('--light-dark-color-1', color1);
      document.documentElement.style.setProperty('--light-dark-color-2', color2);
    }
  }

const handleColorTheme = (colorTheme: string) => {
  // Logic for handling color theme
  // Modify the necessary CSS variables based on the color theme
  // Example implementation:
  if (colorTheme === 'Mint') {
    document.documentElement.style.setProperty('--primary-color', 'mint');
  } else if (colorTheme === 'Blue') {
    document.documentElement.style.setProperty('--primary-color', 'blue');
  } else if (colorTheme === 'Red') {
    document.documentElement.style.setProperty('--primary-color', 'red');
  } else if (colorTheme === 'Yellow') {
    document.documentElement.style.setProperty('--primary-color', 'yellow');
  }
};
  
export { handleDarkMode, handleColorTheme };