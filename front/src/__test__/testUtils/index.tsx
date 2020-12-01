import 'jsdom-global/register'; 
import React from 'react';
import { mount } from 'enzyme';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback) => {
  return mount(<TestHook callback={callback} />);
};