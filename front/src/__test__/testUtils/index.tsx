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


export const MyInfoProp = 
{ id:'test',
nickname:'test',
Reviews:1,
proilePic:""
}  

export const MovieProp =  
{ id:'test', 
title:'test', 
image:'test', 
director:'test', 
pubDate:'test'};

export const AuthorProp = { id:'test', nickname:'test'};

export const ReviewProp = 
{ id:'test', 
Movie: MovieProp, 
User:AuthorProp, 
rating:'GOOD', 
shortComment:'test',
character:'test',
line:'test',
scene:'test',
freeComment:'test',
};