import 'jsdom-global/register'; 
import { act } from 'react-dom/test-utils';
import { testHook } from '../testUtils';
import useAlert from '../../hooks/useAlert';

// [ show, open, close , setter ]

describe('useAlert', ()=>{
    let inputHandler;
    beforeEach(()=>{
        testHook(()=>{
            inputHandler = useAlert();
        })
    });

    it('should have an open function', ()=>{  // open function 체크 
        expect(inputHandler[1]).toBeInstanceOf(Function);
    });
     
    it('should have an close function', ()=>{  // close function 체크 
        expect(inputHandler[2]).toBeInstanceOf(Function);
    });
    
    it('should have an setter function', ()=>{  // setter 체크 
        expect(inputHandler[3]).toBeInstanceOf(Function);
    });

    it('should have correct value', ()=>{ // value 체크 
        expect(inputHandler[0]).toBe(false);
    });

    it('should update the value when open is called',()=>{ // open 기능 체크 
        act(()=>{
            inputHandler[1]();
        });
        expect(inputHandler[0]).toBe(true);
    });

    it('should update the value when close is called',()=>{ // close 기능 체크 
        act(()=>{
            inputHandler[2]();
        });
        expect(inputHandler[0]).toBe(false);
    });

    it('should update the value when setter is called',()=>{ // setter 기능 체크 
        act(()=>{
            inputHandler[3](true);
        });
        expect(inputHandler[0]).toBe(true);
    })
});

