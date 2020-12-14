import 'jsdom-global/register';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../components/Theme';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import Layout from '../../components/Layout';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

describe('<Layout/>', () => {
  let container;
  beforeEach(() => {
    const state = { showAlert: true, loginDone: true };
    useSelector.mockImplementation(() => state);
    container = mount(
      <ThemeProvider theme={lightTheme}>
        <Layout PageName="메뉴" />
      </ThemeProvider>
    );
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
