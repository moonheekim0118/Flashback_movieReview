import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';


const rootReducer=(state,action)=>{
    switch(action.type){
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer=combineReducers({});
            return combineReducer(state,action);
        }
    }
};

export default rootReducer;