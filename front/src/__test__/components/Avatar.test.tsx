import 'jsdom-global/register'; 
import React from "react";
import { MyInfoProp } from '../testUtils';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import Avatar from '../../components/Avatar';

jest.mock('react-redux', ()=>({
    useSelector : jest.fn(),
}));


describe('<Avatar/>',()=>{
    let container;
    beforeEach(()=>{
        useSelector.mockImplementation(()=>MyInfoProp);
        container = mount( <Avatar/> )
    })

    it('should match correctly', ()=>{
        expect(container.html()).toMatchSnapshot();
    })
});