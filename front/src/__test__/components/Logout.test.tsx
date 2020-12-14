import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Logout from '../../components/User/Logout';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

describe('<Logout/>', () => {
  let container;
  beforeEach(() => {
    container = mount(<Logout />);
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
