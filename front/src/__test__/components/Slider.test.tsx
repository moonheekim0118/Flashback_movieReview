import 'jsdom-global/register';
import React from 'react';
import { MovieProp } from './mock.data';
import { mount } from 'enzyme';
import Slider from '../../components/Slider';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('<Slider/>', () => {
  let container;
  beforeEach(() => {
    container = mount(<Slider movieLists={[MovieProp]} />);
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
