import 'jsdom-global/register';
import React from 'react';
import { MovieProp } from './mock.data';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import SearchMovie from '../../components/Movie/SearchMovie';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<SearchMovie/>', () => {
  let container;
  beforeEach(() => {
    const state = {
      loadRelatedSearchLoading: false,
      loadRelatedSearchDone: true,
      searchLists: [MovieProp, MovieProp],
    };
    useSelector.mockImplementation(() => state);
    container = mount(<SearchMovie />);
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
