import 'jsdom-global/register'; 
import { act } from 'react-dom/test-utils';
import { testHook } from '../testUtils';
import useSelecting from '../../hooks/useSelecting';

// [ FirstValue, FirstHandler, SecondValue, SecondHanlder, ThirdValue, ThirdHandler]

describe('useSelecting', ()=>{
    let inputHandler;
    beforeEach(()=>{
        testHook(()=>{
            inputHandler = useSelecting(false);
        })
    });

    it('should have a hanlers function', ()=>{  // handler 체크 
        expect(inputHandler[1]).toBeInstanceOf(Function);
        expect(inputHandler[3]).toBeInstanceOf(Function);
        expect(inputHandler[5]).toBeInstanceOf(Function);
    });
    
    
    it('should have a values as false', ()=>{  // Value check 
        expect(inputHandler[0]).toBe(false);
        expect(inputHandler[2]).toBe(false);
        expect(inputHandler[4]).toBe(false);

    });

    it('should update the value when FirstHandler is called',()=>{ // setter 기능 체크 
        act(()=>{
            inputHandler[1]();
        });
        expect(inputHandler[0]).toBe(true);
        expect(inputHandler[2]).toBe(false);
        expect(inputHandler[4]).toBe(false);
    });

    it('should update the value when SecondHandler is called',()=>{ // setter 기능 체크 
        act(()=>{
            inputHandler[3]();
        });
        expect(inputHandler[0]).toBe(false);
        expect(inputHandler[2]).toBe(true);
        expect(inputHandler[4]).toBe(false);
    });

    it('should update the value when ThirdHandler is called',()=>{ // setter 기능 체크 
        act(()=>{
            inputHandler[5]();
        });
        expect(inputHandler[0]).toBe(false);
        expect(inputHandler[2]).toBe(false);
        expect(inputHandler[4]).toBe(true);
    });
});
