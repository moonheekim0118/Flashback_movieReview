import 'jsdom-global/register'; 
import React from "react";
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import Alert from '../../components/Alert';

jest.mock('react-redux', ()=>({
    useSelector : jest.fn(),
}));


describe('<Alert/>',()=>{
    let container;
    beforeEach(()=>{
        const state = { message: "test", showAlert:true }; 
        useSelector.mockImplementation(()=>state);
        container = mount( <Alert/> )
    })

    it('should match correctly', ()=>{
        expect(container.html()).toMatchSnapshot();
    })
});