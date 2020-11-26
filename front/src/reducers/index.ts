import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import movie from './movie';
import review from './review';
import alert from './alert';

const rootReducer=(state,action)=>{
    switch(action.type){
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer=combineReducers({
                user,
                movie,
                review,
                alert,
            });
            return combineReducer(state,action);
        }
    }
};

export default rootReducer;