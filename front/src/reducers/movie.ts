import * as type from '../actions/movie';
import { produce } from 'immer';
import faker from 'faker';
import shortid from 'shortid';

export const initialState={
    // 영화리스트 가져오기 
    loadMoviesLoading:false,
    loadMoviesDone:false,
    loadMoviesError:null,
    
    // 영화 하나 가져오기
    loadSingleMovieLoading:false,
    loadSingleMovieDone:false,
    loadSingleMovieError:null,

    // 연관검색어 가져오기
    loadRelatedSearchLoading:false,
    loadRelatedSearchDone:false,
    loadRelatedSearchError:null,

    movieLists:[], // 영화 리스트 
    singleMovie:null, // 단일영화     
    searchLists:[], // 연관검색어
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
                draft.movieLists= Array(10).fill(0).map((v,i)=>({
                    id:shortid.generate(),
                    title:faker.name.findName(),
                    director:faker.name.findName(),
                    image:faker.image.image(),
                    pubDate:faker.date.past(),
                    
                }));
                draft.loadMoviesDone=true;
                draft.loadMoviesLoading=false;
                break;

            case type.LOAD_MOVIES_FAIL:
                draft.loadMoviesLoading=false;
                draft.loadMoviesError=action.error;
                break;
            
            // 영화 하나 가져오기 
            case type.LOAD_SINGLE_MOVIE_REQUEST:
                draft.loadSingleMovieLoading=true;
                draft.loadSingleMovieDone=false;
                draft.loadSingleMovieError=null;
                break;
            
            case type.LOAD_SINGLE_MOVIE_SUCCESS:
                draft.loadSingleMovieDone=true;
                draft.loadSingleMovieLoading=false;
                draft.singleMovie={
                    id:shortid.generate(),
                    title:faker.name.findName(),
                    director:faker.name.findName(),
                    image:faker.image.image(),
                    pubDate:faker.date.past(),
                }
                break;

            case type.LOAD_SINGLE_MOVIE_FAIL:
                draft.loadSingleMovieLoading=false;
                draft.loadSingleMovieError=action.error;
                break;

            // 연관검색어 불러오기 
            case type.LOAD_RELATED_SEARCH_REQUEST:
                draft.loadRelatedSearchDone=false;
                draft.loadRelatedSearchLoading=true;
                draft.loadRelatedSearchError=null;
                draft.searchLists=[];
                break;
            
            case type.LOAD_RELATED_SEARCH_SUCCESS:
                console.log(action.data);

                draft.loadRelatedSearchDone=true;
                draft.loadRelatedSearchLoading=false;
                draft.searchLists= action.data;
                break;

            case type.LOAD_RELATED_SEARCH_FAIL:
                draft.loadRelatedSearchLoading=false;
                draft.loadRelatedSearchError=action.error;
                break;
            
        }
    });
};

export default reducer;