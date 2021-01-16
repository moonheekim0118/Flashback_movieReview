import React, { useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../components/Theme';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import GlobalStyle from '../components/GlobalStyle';
import ThemeSwitch from '../components/ThemeSwtich';
import useToggle from '../hooks/useToggle';
import useLocalStorage from '../hooks/useLocalStorage';
import Keys from '../util/storageKeys';

interface Props {
  Component?: React.FunctionComponent;
}

const getTheme = (checked) => {
  return checked ? darkTheme : lightTheme;
};

enum Theme {
  dark = 'darkTheme',
  light = 'lightTheme',
}

const App = ({ Component }: Props) => {
  const [checked, setCheck, setter] = useToggle();
  const [theme, setTheme] = useLocalStorage(Keys.screenTheme);

  useEffect(() => {
    if (theme === Theme.dark) {
      setter(true);
    } else {
      setTheme(Theme.light);
      setter(false);
    }
  }, []);

  const onCheck = useCallback(() => {
    if (theme === Theme.dark) {
      setTheme(Theme.light);
    } else {
      setTheme(Theme.dark);
    }
    setCheck();
  }, [checked, theme]);

  return (
    <>
      <ThemeSwitch onCheck={onCheck} checked={checked} />
      <ThemeProvider theme={getTheme(checked)}>
        <GlobalStyle />
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap"
          />
          <meta charSet="utf-8" />
          <title>플래쉬백</title>
        </Head>
        <div id="alert-root" />
        <Component />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
