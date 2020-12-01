import 'jsdom-global/register'; 
import React from "react";
import { ReviewProp } from './mock.data';
import { mount } from 'enzyme';
import Preview from '../../components/Review/Preview';

jest.mock('react-redux', ()=>({
    useDispatch : jest.fn(),
}));



describe('<Preview/>',()=>{
    let container;
    beforeEach(()=>{
        container = mount( <Preview Review={ReviewProp}/>  )
    })

    it('should match correctly', ()=>{
        expect(container.html()).toMatchSnapshot();
    })
});