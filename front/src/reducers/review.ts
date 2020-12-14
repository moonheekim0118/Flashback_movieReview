import * as type from '../actions/review';
import { Review } from '../model/State';
import { produce } from 'immer';

export const initialState:Review={

    loadMyReviewsLoading:false, // 리뷰 불러오기 
    loadMyReviewsDone:false,
    loadMyReviewsError:null,
    hasMoreReviews:true, // for pagination

    loadSingleReviewLoading:false, // 리뷰 하나 불러오기
    loadSingleReviewDone:false,
    loadSingleReviewError:null, 

    addMyReviewLoading:false, // 리뷰 추가하기 
    addMyReviewDone:false,
    addMyReviewError:null,

    removeMyReviewLoading:false, // 리뷰 삭제하기 
    removeMyReviewDone:false,
    removeMyReviewError:null,
    
    updateMyReviewLoading:false, // 리뷰 수정하기
    updateMyReviewDone:false,
    updateMyReviewError:null,

    myReviews:[], // 현재 로그인된 사용자의 리뷰리스트 
    singleReview:null,
};

const reducer =  (state:Review=initialState, action:type.Action):Review=>{
    return produce(state,draft=>{
        switch(action.type){
            // 로딩 
            case type.LOAD_MY_REVIEWS_REQUEST:
                draft.loadMyReviewsDone=false;
                draft.loadMyReviewsLoading=true;
                draft.loadMyReviewsError=null;
                break;
            
            case type.LOAD_MY_REVIEWS_SUCCESS:
                draft.myReviews=draft.myReviews.concat(action.data); 
                draft.loadMyReviewsDone=true;
                draft.loadMyReviewsLoading=false;
                draft.hasMoreReviews=action.data.length===10;
                break;

            case type.LOAD_MY_REVIEWS_FAIL:
                draft.loadMyReviewsLoading=false;
                draft.loadMyReviewsError=action.error;
                break;
            
            // 단일 리뷰 불러오기
            case type.LOAD_SINGLE_REVIEW_REQUEST:
                draft.loadSingleReviewDone=false;
                draft.loadSingleReviewLoading=true;
                draft.loadSingleReviewError=null;
                break;

            case type.LOAD_SINGLE_REVIEW_SUCCESS:
                draft.loadSingleReviewDone=true;
                draft.loadSingleReviewLoading=false;
                draft.singleReview=action.data;
                break;
            
            case type.LOAD_SINGLE_REVIEW_FAIL:
                draft.loadSingleReviewLoading=false;
                draft.loadSingleReviewError=action.error;
                break;
            // 추가 
            case type.ADD_MY_REVIEW_REQUEST:
                draft.addMyReviewDone=false;
                draft.addMyReviewLoading=true;
                draft.addMyReviewError=null;
                break;
            
            case type.ADD_MY_REVIEW_SUCCESS:
                draft.myReviews.unshift(action.data);
                draft.addMyReviewDone=true;
                draft.addMyReviewLoading=false;
                break;

            case type.ADD_MY_REVIEW_FAIL:
                draft.addMyReviewLoading=false;
                draft.addMyReviewError=action.error;
                break;
            
            // 삭제   
            case type.REMOVE_MY_REVIEW_REQUEST:
                draft.removeMyReviewDone=false;
                draft.removeMyReviewLoading=true;
                draft.removeMyReviewError=null;
                break;
            
            case type.REMOVE_MY_REVIEW_SUCCESS:
                draft.myReviews=draft.myReviews.filter((v)=>v.id!==action.data);
                draft.removeMyReviewDone=true;
                draft.removeMyReviewLoading=false;
                break;

            case type.REMOVE_MY_REVIEW_FAIL:
                draft.removeMyReviewLoading=false;
                draft.removeMyReviewError=action.error;
                break;

            // 수정 , 업데이트한 기록 초기화
            case type.UPDATE_MY_REVIEW_REQUEST:
                draft.updateMyReviewDone=false;
                draft.updateMyReviewLoading=true;
                draft.updateMyReviewError=null;
                break;
            
            case type.UPDATE_MY_REVIEW_SUCCESS:
                draft.singleReview=action.data;
                draft.updateMyReviewDone=true;
                draft.updateMyReviewLoading=false;
                break;

            case type.UPDATE_MY_REVIEW_FAIL:
                draft.updateMyReviewLoading=false;
                draft.updateMyReviewError=action.error;
                break;

        }
    });
};

export default reducer;