import 'jsdom-global/register';
import React from 'react';
import { ReviewProp } from './mock.data';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import TextEditor from '../../components/Review/TextEditor';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<TextEditor/>', () => {
  let container;
  beforeEach(() => {
    const state = {
      myReviews: [ReviewProp, ReviewProp],
      addMyReviewDone: false,
      addMyReviewError: null,
      updateMyReviewDone: false,
      updateMyReviewError: null,
    };
    useSelector.mockImplementation(() => state);
    container = mount(<TextEditor Review={ReviewProp} ButtonType="create" />);
  });

  it('should match correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
