import 'jsdom-global/register'; 
import React from "react";
import { mount } from 'enzyme';
import Button from '../../atoms/Buttons';

describe('<Button/>', () => {
   let container = null;
   const mockFn = jest.fn();

   it('renders correctly', ()=>{ // 렌더링 테스트 
      container=mount(<Button title="test" fill={false} shadow={false} disabled={false}  onClick={mockFn} color="lightPurple"/>);
   });

   it('matches snapshot', ()=>{ // 스냅샷 비교 
    expect(container.html()).toMatchSnapshot();
   });

   it('should call onClick if button is clicked',()=>{ // onClick 버튼 시뮬레이션 
      container.simulate('click');
      expect(mockFn).toHaveBeenCalled();
   });

   
})
