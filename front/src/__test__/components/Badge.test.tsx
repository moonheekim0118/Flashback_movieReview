import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Badge from '../../components/Review/Badge';

describe('<Badge/>', () => {
  let container = null;
  const mockFn = jest.fn();

  it('renders correctly', () => {
    // 렌더링 테스트
    container = mount(
      <Badge badgeName="GOOD" selected={true} onClick={mockFn} />
    );
  });

  it('matches snapshot', () => {
    // 스냅샷 비교
    expect(container.html()).toMatchSnapshot();
  });

  it('should call onClick if Container is clicked', () => {
    // onClick 버튼 시뮬레이션
    container.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
