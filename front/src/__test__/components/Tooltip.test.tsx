import 'jsdom-global/register'; 
import React from "react";
import { mount } from 'enzyme';
import Tooltip from '../../components/Tooltip';

describe('<Tooltip/>', () => {
   let container = null;
   const mockFn1 = jest.fn();
   const mockFn2 = jest.fn();
   const mockFn3 = jest.fn();

   const mockProps = [ { title: 'test1', onClick:mockFn1},
                       { title: 'test2', onClick:mockFn2} ];

   it('renders correctly', ()=>{ // 렌더링 테스트 
    container=mount(<Tooltip onClose={mockFn3} buttonList={mockProps}/>);
   });

   it('matches snapshot', ()=>{ // 스냅샷 비교 
    expect(container.html()).toMatchSnapshot();
   });

   it('should have two items', ()=>{ // item이 mockProps 개수대로 들어가있는지 확인 
      expect(container.find('#item').hostNodes()).toHaveLength(mockProps.length);
   });

   it('should call onClose if Overaly is clicked',()=>{ // onClose 버튼 시뮬레이션 
    container.find('#overaly').hostNodes().simulate('click');
    expect(mockFn3).toHaveBeenCalled();
    });

   it('should call first onClick if first Item container is clicked', ()=>{ // 첫번째 onClick 버튼 
    container.find('#item').first().simulate('click');
    expect(mockFn1).toHaveBeenCalled();
   });

   it('should call second onClick if second Item container is clicked', ()=>{ // 두번째 onClick 버튼 
    container.find('#item').last().simulate('click');
    expect(mockFn2).toHaveBeenCalled();
   });

})
