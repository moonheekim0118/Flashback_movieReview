import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Slot from '../../components/Slot';

describe('<Slot/>', () => {
  let container = null;

  it('renders correctly', () => {
    // 렌더링 테스트
    container = mount(<Slot reviewsCount={30} />);
  });

  it('matches snapshot', () => {
    // 스냅샷 비교
    expect(container.html()).toMatchSnapshot();
  });
});
