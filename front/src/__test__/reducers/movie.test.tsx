import reducer from '../../reducers/movie';
import { MovieProp } from '../components/mock.data';
import * as type from '../../actions/movie';


describe('movie reducer',()=> {
    it('should request load movies', ()=>{ // 영화 로딩 리퀘스트 
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_REQUEST,
                data : { title :'test', start:0}
            })
        ).toEqual({
            loadMoviesLoading:true,
            loadMoviesDone:false,
            loadMoviesError:null,
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            movieLists:[],
            singleMovie:null,
            searchLists:[],
            hasMoreMovies:true,
        });
    });

    it('should succeed load movies',()=>{ // 영화 로딩 성공 
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_SUCCESS,
                data : [MovieProp]
            })
        ).toEqual({
            loadMoviesLoading:false,
            loadMoviesDone:true,
            loadMoviesError:null,
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            movieLists:[MovieProp],
            singleMovie:null,
            searchLists:[],
            hasMoreMovies:false,
        });
    })

    it('should fail load movies',()=>{ // 영화 로딩 실패 
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_FAIL,
                error:'test'
            })
        ).toEqual({
            loadMoviesLoading:false,
            loadMoviesDone:false,
            loadMoviesError:'test',
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            movieLists:[],
            singleMovie:null,
            searchLists:[],
            hasMoreMovies:true,
        });
    });

    it('should save Movie',()=>{ // 영화 저장 
        expect(
            reducer(undefined,{
                type: type.SAVE_MOVIE,
                data:MovieProp
            })
        ).toEqual({
            loadMoviesLoading:false,
            loadMoviesDone:false,
            loadMoviesError:null,
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            movieLists:[],
            singleMovie:MovieProp,
            searchLists:[],
            hasMoreMovies:true,
        })
    });

    it('should request related search',()=>{ // 연관검색어 로딩 리퀘스트 
        expect(
            reducer(undefined,{
                type: type.LOAD_RELATED_SEARCH_REQUEST,
                data:'test',
            })
        ).toEqual({
            loadMoviesLoading:false,
            loadMoviesDone:false,
            loadMoviesError:null,
            movieLists:[],
            hasMoreMovies:true,
            loadRelatedSearchLoading:true,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            singleMovie:null,
            searchLists:[],
        })
    });
`            `

    it('should fail related search',()=>{ // 연관검색어 저장 실패 
        expect(
            reducer(undefined,{
                type: type.LOAD_RELATED_SEARCH_FAIL,
                error:'test'
            })
        ).toEqual({
            loadMoviesLoading:false,
            loadMoviesDone:false,
            loadMoviesError:null,
            movieLists:[],
            hasMoreMovies:true,
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:'test',
            singleMovie:null,
            searchLists:[],
        })
    });
})