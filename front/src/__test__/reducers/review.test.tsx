import reducer from '../../reducers/review';
import { ReviewProp } from '../components/mock.data';
import * as type from '../../actions/review';

describe('review reducer',()=> {
    let draft;

    beforeEach(()=>{
        draft={
            loadMyReviewsLoading:false, 
            loadMyReviewsDone:false,
            loadMyReviewsError:null,
            hasMoreReviews:true, 
            loadSingleReviewLoading:false,
            loadSingleReviewDone:false,
            loadSingleReviewError:null, 
            addMyReviewLoading:false,
            addMyReviewDone:false,
            addMyReviewError:null,
            removeMyReviewLoading:false, 
            removeMyReviewDone:false,
            removeMyReviewError:null,
            updateMyReviewLoading:false, 
            updateMyReviewDone:false,
            updateMyReviewError:null,
            myReviews:[],
            singleReview:null,
        }
    });

    it('should request load my reviews', ()=>{ // 리뷰 리스트 로딩 리퀘스트 
        draft.loadMyReviewsLoading=true;
        expect(
            reducer(undefined,{
                type: type.LOAD_MY_REVIEWS_REQUEST
            })
        ).toEqual(draft);
    });

    it('should succeed load my reviews', ()=>{ // 리뷰 리스트 로딩 성공 
        draft.loadMyReviewsDone=true;
        draft.hasMoreReviews=false;
        draft.myReviews =[ReviewProp];
        expect(
            reducer(undefined,{
                type: type.LOAD_MY_REVIEWS_SUCCESS,
                data: [ReviewProp]
            })
        ).toEqual(draft)
    });

    it('should fail load my reviews', ()=>{ // 리뷰 리스트 로딩 실패 
        draft.loadMyReviewsError='test';
        expect(
            reducer(undefined,{
                type: type.LOAD_MY_REVIEWS_FAIL,
                error: 'test',
            })
        ).toEqual(draft)
    });

    it('should request add my reviews', ()=>{ // 리뷰 추가 리퀘스트 
        draft.addMyReviewLoading=true;
        expect(
            reducer(undefined,{
                type: type.ADD_MY_REVIEW_REQUEST,
                data: ReviewProp
            })
        ).toEqual(draft)
    });

    it('should succeed add my reviews', ()=>{ // 리뷰 추가 성공 
        draft.addMyReviewDone=true;
        draft.myReviews=[ReviewProp];
        expect(
            reducer(undefined,{
                type: type.ADD_MY_REVIEW_SUCCESS,
                data: ReviewProp
            })
        ).toEqual(draft)
    });

    
    it('should fail add my reviews', ()=>{ // 리뷰 추가 실패 
        draft.addMyReviewError='test';
        expect(
            reducer(undefined,{
                type: type.ADD_MY_REVIEW_FAIL,
                error:'test'
            })
        ).toEqual(draft)
    });
 
    it('should request remove my reviews', ()=>{ // 리뷰 삭제 리퀘스트 
        draft.removeMyReviewLoading=true;
        expect(
            reducer(undefined,{
                type: type.REMOVE_MY_REVIEW_REQUEST,
                data: 'id',
            })
        ).toEqual(draft)
    });

    it('should succeed remove my reviews', ()=>{ // 리뷰 삭제 성공 
        draft.removeMyReviewDone=true;
        expect(
            reducer(undefined,{
                type: type.REMOVE_MY_REVIEW_SUCCESS,
                data: 'id',
            })
        ).toEqual(draft)
    });
    
    it('should fail remove my reviews', ()=>{ // 리뷰 삭제 실패 
        draft.removeMyReviewError='test';
        expect(
            reducer(undefined,{
                type: type.REMOVE_MY_REVIEW_FAIL,
                error: 'test'
            })
        ).toEqual(draft)
    });

    it('should request update my reviews', ()=>{ // 리뷰 수정 리퀘스트 
        draft.updateMyReviewLoading=true;
        expect(
            reducer(undefined,{
                type: type.UPDATE_MY_REVIEW_REQUEST,
                data: ReviewProp
            })
        ).toEqual(draft)
    });

    it('should succeed update my reviews', ()=>{ // 리뷰 수정 성공 
        draft.singleReview=ReviewProp;
        draft.updateMyReviewDone=true;
        expect(
            reducer(undefined,{
                type: type.UPDATE_MY_REVIEW_SUCCESS,
                data: ReviewProp
            })
        ).toEqual(draft)
    });

    it('should fails update my reviews', ()=>{ // 리뷰 수정 실패 
        draft.updateMyReviewError='test';
        expect(
            reducer(undefined,{
                type: type.UPDATE_MY_REVIEW_FAIL,
                error:'test'
            })
        ).toEqual(draft)
    });

    it('should request load my single review', ()=>{ // 리뷰 1개 로딩 리퀘스트 
        draft.loadSingleReviewLoading=true;
        expect(
            reducer(undefined,{
                type: type.LOAD_SINGLE_REVIEW_REQUEST,
                data:'id',
            })
        ).toEqual(draft)
    });

    it('should succeed load my single review', ()=>{ // 리뷰 1개 로딩 성공 
        draft.loadSingleReviewDone=true;
        draft.singleReview=ReviewProp;
        expect(
            reducer(undefined,{
                type: type.LOAD_SINGLE_REVIEW_SUCCESS,
                data:ReviewProp,
            })
        ).toEqual(draft)
    });

    it('should fail load my single review', ()=>{ // 리뷰 1개 로딩 실패 
        draft.loadSingleReviewError='test';
        expect(
            reducer(undefined,{
                type: type.LOAD_SINGLE_REVIEW_FAIL,
                error:'test'
            })
        ).toEqual(draft)
    });
})