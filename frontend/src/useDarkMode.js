import { useEffect, useState } from 'react';

export default () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setMode('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setMode('light');
    }
  };

  const setMode = theme => {
    setTheme(theme);
    if (theme === 'light')
      document.documentElement.style.cssText = `
        --main-color: #4267b2;
        --main-color-light: #5383e2;
        --main-color-dark: #3b5ca0;
        --main-color-disabled: #9cb4d8;
        --background-color-light: #f5f6f7;
        --background-color: #e9ebee;
        --background-dark: #242424;
        --border-color-light: #dddfe2;
        --border-color: #ccd0d5;
        --border-color-dark: #28477b;
        --invalid-color: #a94442;
        --invalid-background-color: #f2dede;
        --invalid-border-color: #ebccd1;
        --placeholder: #8d949e;
        --placeholder-focus: #ccd0d5;
        --grey-label-lighter: #c7cbcf;
        --grey-label-light: #8d949e;
        --grey-label: #616770;
        --grey-label-dark: #4b4f56;
        --grey-label-darker: #444950;
        --grey-label-darkest: #1d2129;
        --background-white: #ffffff;
        --color-white: #ffffff;
        --color-black: #000000;
      `;
    else
      document.documentElement.style.cssText = `
    --main-color: #3f5d99;
    --main-color-light: #5383e2;
    --main-color-dark: #2c477c;
    --main-color-disabled: #72839c;
    --background-color-light: #1e1e1e;
    --background-color: #1c1c1c;
    --background-dark: #242424;
    --border-color-light: #888a8b;
    --border-color: #5a5b5e;
    --border-color-dark: #28477b;
    --invalid-color: #a94442;
    --invalid-background-color: #f2dede;
    --invalid-border-color: #ebccd1;
    --placeholder: #8d949e;
    --placeholder-focus: #54585e;
    --grey-label-lighter: #e6e8eb;
    --grey-label-light: #b1bbc9;
    --grey-label: #7b838f;
    --grey-label-dark: #88909c;
    --grey-label-darker: #444950;
    --grey-label-darkest: #1d2129;
    --background-white: #262626;
    --color-white: #ececec;
    --color-black: #ffffff;
  `;
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setMode(localTheme);
    }
  }, []);

  return [theme, toggleTheme];
};
