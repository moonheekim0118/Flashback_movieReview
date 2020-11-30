import 'jsdom-global/register'; 
import React from "react";
import { mount } from 'enzyme';
import ThemeSwitch from '../../components/ThemeSwtich';

describe('<Badge/>', () => {
   let container = null;
   const mockFn = jest.fn();

   it('renders correctly', ()=>{ // 렌더링 테스트 
      container=mount(<ThemeSwitch onCheck={mockFn} checked={true}/>);
   });

   it('matches snapshot', ()=>{ // 스냅샷 비교 
    expect(container.html()).toMatchSnapshot();
   });

   it('should call onCheck if Switch is change',()=>{ // onClick 버튼 시뮬레이션 
    container.find('#switch').hostNodes().simulate('change');
    expect(mockFn).toHaveBeenCalled();
    });

})
