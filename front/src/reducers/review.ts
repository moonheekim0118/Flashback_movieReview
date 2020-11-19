import * as type from '../actions/review';
import { produce } from 'immer';
import faker from 'faker';
import shortid from 'shortid';

export const initialState={

    loadMyReviewsLoading:false, // 리뷰 불러오기 
    loadMyReviewsDone:false,
    loadMyReviewsError:null,

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
};

const reducer =  (state=initialState, action)=>{
    return produce(state,draft=>{
        switch(action.type){
            // 로딩 
            case type.LOAD_MY_REVIEWS_REQUEST:
                draft.loadMyReviewsDone=false;
                draft.loadMyReviewsLoading=true;
                draft.loadMyReviewsError=null;
                break;
            
            case type.LOAD_MY_REVIEWS_SUCCESS:
                draft.myReviews=action.data; 
                draft.myReviews=Array(5).fill(0).map((v,i)=>({
                    id:shortid.generate(),
                    movieInfo:{
                        id:shortid.generate(),
                        title:faker.name.findName(),
                        director:faker.name.findName(),
                        image:faker.image.image(),
                        pubDate:faker.date.past(), 
                    },
                    rating:'GOOD',
                    shortComment:faker.name.findName(),
                    chracter:faker.name.findName(),
                    line:faker.name.findName(),
                    scene:faker.name.findName(),
                    freeComment:faker.name.findName(),
                }));
                
                draft.loadMyReviewsDone=true;
                draft.loadMyReviewsLoading=false;
                break;

            case type.LOAD_MY_REVIEWS_FAIL:
                draft.loadMyReviewsLoading=false;
                draft.loadMyReviewsError=action.error;
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
                draft.loadMyReviewsLoading=false;
                draft.loadMyReviewsError=action.error;
                break;
            
            // 삭제 
            case type.REMOVE_MY_REVIEW_REQUEST:
                draft.removeMyReviewDone=false;
                draft.removeMyReviewLoading=true;
                draft.removeMyReviewError=null;
                break;
            
            case type.REMOVE_MY_REVIEW_SUCCESS:
                draft.myReviews=draft.myReviews.filter((v)=>v.id!==action.data.id);
                draft.removeMyReviewDone=true;
                draft.removeMyReviewLoading=false;
                break;

            case type.REMOVE_MY_REVIEW_FAIL:
                draft.removeMyReviewLoading=false;
                draft.removeMyReviewError=action.error;
                break;

            // 수정 
            case type.UPDATE_MY_REVIEW_REQUEST:
                draft.updateMyReviewDone=false;
                draft.updateMyReviewLoading=true;
                draft.updateMyReviewError=null;
                break;
            
            case type.UPDATE_MY_REVIEW_SUCCESS:
                const index = draft.myReviews.findIndex((v)=>v.id === action.data.id);
                draft.myReviews[index]=action.data;
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