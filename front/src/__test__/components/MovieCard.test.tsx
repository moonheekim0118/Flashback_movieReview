import 'jsdom-global/register';
import React from 'react';
import { MovieProp } from './Mock.data';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import MovieCard from '../../components/Movie/MovieCard';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<MovieCard/>', () => {
  let container;
  beforeEach(() => {
    const state = { loginDone: true };
    useSelector.mockImplementation(() => state);
    container = mount(<MovieCard Movie={MovieProp} />);
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
