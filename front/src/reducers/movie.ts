import * as type from '../actions/movie';
import { produce } from 'immer';

export const initialState={
    // 영화리스트 가져오기 
    loadMoviesLoading:false,
    loadMoviesDone:false,
    loadMoviesError:null,

    // 단일 영화 가져오기 
    loadSingleMovieLoading:false,
    loadSingleMovieDone:false,
    loadSingleMovieError:null,
    
    movieLists:[], // 영화 리스트 
    singleMovie:null, // 단일영화     
};


const reducer =  (state=initialState, action)=>{
    return produce(state,draft=>{
        switch(action.type){
            // 영화 리스트 불러오기 
            case type.LOAD_MOVIES_REQUEST:
                draft.loadMoviesLoading=false;
                draft.loadMoviesDone=true;
                draft.loadMoviesError=null;
                break;
            
            case type.LOAD_MOVIES_SUCCESS:
                draft.movieLists=action.data; 
                draft.loadMoviesDone=true;
                draft.loadMoviesLoading=false;
                break;

            case type.LOAD_MOVIES_FAIL:
                draft.loadMoviesLoading=false;
                draft.loadMoviesError=action.error;
                break;
            
            // 단일 영화 불러오기 
            case type.LOAD_SINGLE_MOVIE_REQUEST:
                draft.loadSingleMovieDone=false;
                draft.loadSingleMovieLoading=true;
                draft.loadSingleMovieError=null;
                break;
            
            case type.LOAD_SINGLE_MOVIE_SUCCESS:
                draft.loadSingleMovieDone=true;
                draft.loadSingleMovieLoading=false;
                draft.singleMovie=action.data;
                break;

            case type.LOAD_SINGLE_MOVIE_FAIL:
                draft.loadSingleMovieLoading=false;
                draft.loadMoviesError=action.error;
            
        }
    });
};

export default reducer;