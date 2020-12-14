import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Icon from '../../atoms/Icons';
import { faAd } from '@fortawesome/free-solid-svg-icons';

describe('<Icon/>', () => {
  let container = null;
  const mockFn = jest.fn();

  it('renders correctly', () => {
    // 렌더링 테스트
    container = mount(<Icon icon={faAd} onClick={mockFn} className="faAd" />);
  });

  it('matches snapshot', () => {
    // 스냅샷 비교
    expect(container.html()).toMatchSnapshot();
  });

  it('should call onClick if button is clicked', () => {
    // onClick 버튼 시뮬레이션
    container.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
