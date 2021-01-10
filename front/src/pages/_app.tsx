import React, { useEffect, useCallback } from 'react';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import GlobalStyle from '../components/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../components/Theme';
import { getItem, setItem } from '../util/localStorage';
import ThemeSwitch from '../components/ThemeSwtich';
import useToggle from '../hooks/useToggle';

interface Props {
  Component?: React.FunctionComponent;
}

const getTheme = (checked) => {
  return checked ? darkTheme : lightTheme;
};

const App = ({ Component }: Props) => {
  const [checked, setCheck, setter] = useToggle();

  const onCheck = useCallback(() => {
    const theme = getTheme(checked);
    if (theme === darkTheme) {
      setItem('theme', 'darkTheme');
    } else {
      setItem('theme', 'lightTheme');
    }
    setCheck();
  }, [checked]);

  useEffect(() => {
    const checked = getItem('theme');
    if (checked === 'darkTheme') {
      setter(true);
    } else {
      setItem('theme', 'lightTheme');
      setter(false);
    }
  }, []);

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
