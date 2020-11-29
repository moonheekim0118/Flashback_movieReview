import 'jsdom-global/register'; 
import React from "react";
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
import Button from '../atoms/Buttons';

describe('<Button/>', () => {
   it('matches snapshot', ()=>{
    const container =mount(<Button title="test" fill={false} shadow={false} disabled={false} color="lightPurple"/>);
    expect(container.html()).toMatchSnapshot();
   });
})
