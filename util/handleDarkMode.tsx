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

  export default handleDarkMode;