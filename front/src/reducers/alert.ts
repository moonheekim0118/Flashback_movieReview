import * as type from '../actions/alert';
import { produce } from 'immer';

export const initialState={
    showAlert:false,
    message:""
}; 

const reducer =  (state=initialState, action)=>{
    return produce(state,draft=>{
        switch(action.type){
            case type.OPEN_ALERT:
                draft.showAlert=true;
                draft.message=action.data; // alert 메시지
                break;
            
            case type.CLOSE_ALERT:
                draft.showAlert=false;
                break;
        }
    });
};

export default reducer;