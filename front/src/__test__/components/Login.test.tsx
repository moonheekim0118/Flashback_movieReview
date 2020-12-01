import 'jsdom-global/register'; 
import React from "react";
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../components/Theme';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import Login from '../../components/User/Login';

jest.mock('react-redux', ()=>({
    useSelector : jest.fn(),
    useDispatch : jest.fn(()=>jest.fn()),
}));


describe('<Login/>',()=>{
    let container;
    beforeEach(()=>{
        const state = { loginError:false }; 
        useSelector.mockImplementation(()=>state);
        container = mount( 
        <ThemeProvider theme={lightTheme}>
            <Login/> 
        </ThemeProvider>
        )
    })

    it('should match correctly', ()=>{
        expect(container.html()).toMatchSnapshot();
    })
});