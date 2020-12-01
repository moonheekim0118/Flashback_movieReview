import reducer from '../../reducers/movie';
import { MovieProp } from '../components/mock.data';
import * as type from '../../actions/movie';


describe('movie reducer',()=> {
    let draft;

    beforeEach(()=>{
        draft={
            loadMoviesLoading:false,
            loadMoviesDone:false,
            loadMoviesError:null,
            loadRelatedSearchLoading:false,
            loadRelatedSearchDone:false,
            loadRelatedSearchError:null,
            movieLists:[],
            singleMovie:null,
            searchLists:[],
            hasMoreMovies:true,
        }
    });
    
    it('should request load movies', ()=>{ // 영화 로딩 리퀘스트 
        draft.loadMoviesLoading=true;
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_REQUEST,
                data : { title :'test', start:0}
            })
        ).toEqual(draft);
    });

    it('should succeed load movies',()=>{ // 영화 로딩 성공 
        draft.movieLists=[MovieProp];
        draft.loadMoviesDone=true;
        draft.hasMoreMovies=false;
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_SUCCESS,
                data : [MovieProp]
            })
        ).toEqual(draft);
    })

    it('should fail load movies',()=>{ // 영화 로딩 실패 
        draft.loadMoviesLoading=false;
        draft.loadMoviesError='test';
        expect(
            reducer(undefined,{
                type: type.LOAD_MOVIES_FAIL,
                error:'test'
            })
        ).toEqual(draft);
    });

    it('should save Movie',()=>{ // 영화 저장 
        draft.singleMovie=MovieProp;
        expect(
            reducer(undefined,{
                type: type.SAVE_MOVIE,
                data:MovieProp
            })
        ).toEqual(draft)
    });

    it('should request related search',()=>{ // 연관검색어 로딩 리퀘스트 
        draft.loadRelatedSearchLoading=true;
        expect(
            reducer(undefined,{
                type: type.LOAD_RELATED_SEARCH_REQUEST,
                data:'test',
            })
        ).toEqual(draft)
    });
`            `

    it('should fail related search',()=>{ // 연관검색어 저장 실패 
        draft.loadRelatedSearchLoading=false;
        draft.loadRelatedSearchError='test';
        expect(
            reducer(undefined,{
                type: type.LOAD_RELATED_SEARCH_FAIL,
                error:'test'
            })
        ).toEqual(draft)
    });
})