import 'jsdom-global/register'; 
import { titleParser, directorParser } from '../../util/movieParser';

describe('movieParser',()=>{
    it('titleParser works correctly', ()=>{
        const title='<b>test</b>test<b>test</b>test';
        expect(titleParser(title)).toBe('testtesttesttest');
    })

    it('director works correctly',()=>{
        const director='test|test|test|';
        expect(directorParser(director)).toBe('testtesttest');
    })
});