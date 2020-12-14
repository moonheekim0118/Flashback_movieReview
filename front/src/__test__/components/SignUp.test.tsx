import 'jsdom-global/register';
import React from 'react';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../components/Theme';
import SignUp from '../../components/User/SignUpForm';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

describe('<SignUp/>', () => {
  let container;
  beforeEach(() => {
    const state = { signUpError: false };
    useSelector.mockImplementation(() => state);
    container = mount(
      <ThemeProvider theme={lightTheme}>
        <SignUp />
      </ThemeProvider>
    );
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
