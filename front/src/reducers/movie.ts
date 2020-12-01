import * as type from '../actions/movie';
import { titleParser,directorParser } from '../util/movieParser';
import { produce } from 'immer';

export const initialState={
    // 영화리스트 가져오기 
    loadMoviesLoading:false,
    loadMoviesDone:false,
    loadMoviesError:null,
    hasMoreMovies:true, // for pagination

    // 연관검색어 가져오기
    loadRelatedSearchLoading:false,
    loadRelatedSearchDone:false,
    loadRelatedSearchError:null,

    movieLists:[], // 영화 리스트 
    singleMovie:null, // 단일영화     
    searchLists:[], // 연관검색어
};


const reducer =  (state=initialState, action:type.Action)=>{
    return produce(state,draft=>{
        switch(action.type){
                
            // 영화 리스트 불러오기 
            case type.LOAD_MOVIES_REQUEST:
                draft.loadMoviesLoading=true;
                draft.loadMoviesDone=false;
                draft.loadMoviesError=null;
                break;
            
            case type.LOAD_MOVIES_SUCCESS:
                action.data.forEach((v,i)=>{
                    v.title=titleParser(v.title);
                    v.director=directorParser(v.director);
                }); // 타이틀 및 디렉터 파싱 
                draft.movieLists=draft.movieLists.concat(action.data); // 불러온 영화 추가하기 
                draft.loadMoviesDone=true;
                draft.loadMoviesLoading=false;
                draft.hasMoreMovies = action.data.length===10; // 10개가 안되면 더이상 불러올 영화가 없음 
                break;

            case type.LOAD_MOVIES_FAIL:
                draft.loadMoviesLoading=false;
                draft.loadMoviesError=action.error;
                break;
            
            // 영화 하나 저장하기
            case type.SAVE_MOVIE:
                draft.singleMovie=action.data;
                break;
            
            // 연관검색어 불러오기 
            case type.LOAD_RELATED_SEARCH_REQUEST:
                draft.loadRelatedSearchDone=false;
                draft.loadRelatedSearchLoading=true;
                draft.loadRelatedSearchError=null;
                draft.searchLists=[];
                break;
            
            case type.LOAD_RELATED_SEARCH_SUCCESS:
                action.data.forEach((v,i)=>{ // 타이틀 및 디렉터 파싱 
                    v.title=titleParser(v.title);
                    v.director=directorParser(v.director);
                })
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