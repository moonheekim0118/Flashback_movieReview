import reducer from '../../reducers/alert';
import * as type from '../../actions/alert';

describe('alert reducer',()=> {
    it('should open alert', ()=>{ // open alert 
        expect(
            reducer(undefined,{
                type: type.OPEN_ALERT,
                data:'run the test'
            })
        ).toEqual({
            message:'run the test',
            showAlert:true
        })
    });
    
    it('should close alert',()=>{ // close alert 
        expect(
            reducer(undefined,{
                type: type.CLOSE_ALERT
            })
        ).toEqual({
            showAlert:false,
            message:""
        })
    })
})