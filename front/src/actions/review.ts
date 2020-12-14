import { ReviewList } from '../model/ReviewList';
import { MovieList } from '../model/MovieList';
import Error from '../model/Error';

// loadMyReviews
export const LOAD_MY_REVIEWS_REQUEST="LOAD_MY_REVIEWS_REQUEST" as const;
export const LOAD_MY_REVIEWS_SUCCESS="LOAD_MY_REVIEWS_SUCCESS" as const;
export const LOAD_MY_REVIEWS_FAIL="LOAD_MY_REVIEWS_FAIL" as const;

// load single Review
export const LOAD_SINGLE_REVIEW_REQUEST="LOAD_SINGLE_REVIEW_REQUEST" as const;
export const LOAD_SINGLE_REVIEW_SUCCESS="LOAD_SINGLE_REVIEW_SUCCESS" as const;
export const LOAD_SINGLE_REVIEW_FAIL="LOAD_SINGLE_REVIEW_FAIL" as const;

// add My reviews
export const ADD_MY_REVIEW_REQUEST="ADD_MY_REVIEW_REQUEST" as const;
export const ADD_MY_REVIEW_SUCCESS="ADD_MY_REVIEW_SUCCESS" as const;
export const ADD_MY_REVIEW_FAIL="ADD_MY_REVIEW_FAIL" as const;

// remove my Review
export const REMOVE_MY_REVIEW_REQUEST="REMOVE_MY_REVIEW_REQUEST" as const;
export const REMOVE_MY_REVIEW_SUCCESS="REMOVE_MY_REVIEW_SUCCESS" as const;
export const REMOVE_MY_REVIEW_FAIL="REMOVE_MY_REVIEW_FAIL" as const;

//update my Review
export const UPDATE_MY_REVIEW_REQUEST="UPDATE_MY_REVIEW_REQUEST" as const;
export const UPDATE_MY_REVIEW_SUCCESS="UPDATE_MY_REVIEW_SUCCESS" as const;
export const UPDATE_MY_REVIEW_FAIL="UPDATE_MY_REVIEW_FAIL" as const;

export const loadMyReviewsAction=(data?:number)=>{
    return {
        type:LOAD_MY_REVIEWS_REQUEST,
        data:data
    };
};

export const loadSingleReviewAction=(data:string|string[])=>{
    return { 
        type:LOAD_SINGLE_REVIEW_REQUEST,
        data:data
    };
};

export const addMyReviewAction=(data:Review)=>{
    return {
        type: ADD_MY_REVIEW_REQUEST,
        data:data
    };
};

export const removeMyReviewAction=(data:string)=>{
    return {
        type:REMOVE_MY_REVIEW_REQUEST,
        data:data
    }
};

export const updateMyReviewAction=(data:ReviewList)=>{
    return {
        type:UPDATE_MY_REVIEW_REQUEST,
        data:data
    }
}
;

export type Action = 
| ReturnType <typeof loadMyReviewsAction>
| ReturnType <typeof loadSingleReviewAction>
| ReturnType <typeof addMyReviewAction>
| ReturnType <typeof removeMyReviewAction>
| ReturnType <typeof updateMyReviewAction>
| loadMyReviewsSuccess 
| loadMyReviewsFail
| loadSingleReviewSuccess 
| loadSingleReviewFail 
| addMyReviewSuccess 
| addMyReviewFail 
| removeMyReviewSuccess 
| removeMyReviewFail 
| updateMyReviewSuccess 
| updateMyReviewFail;

type ReviewListArray = Array<ReviewList>;

type Review = { Movie: MovieList , rating : string, shortComment: string,
              character:string, line: string, scene: string, freeComment:string};

interface loadMyReviewsSuccess {
    type:'LOAD_MY_REVIEWS_SUCCESS';
    data:ReviewListArray
};

interface loadMyReviewsFail extends Error {
    type:'LOAD_MY_REVIEWS_FAIL';
};

interface loadSingleReviewSuccess {
    type:'LOAD_SINGLE_REVIEW_SUCCESS';
    data:ReviewList;
};

interface loadSingleReviewFail extends Error {
    type:'LOAD_SINGLE_REVIEW_FAIL';
};

interface addMyReviewSuccess {
    type:'ADD_MY_REVIEW_SUCCESS';
    data:ReviewList;
};

interface addMyReviewFail extends Error {
    type:'ADD_MY_REVIEW_FAIL';
};

interface removeMyReviewSuccess { 
    type:'REMOVE_MY_REVIEW_SUCCESS';
    data:string;
};

interface removeMyReviewFail  extends Error { 
    type:'REMOVE_MY_REVIEW_FAIL';
};


interface updateMyReviewSuccess { 
    type:'UPDATE_MY_REVIEW_SUCCESS';
    data:ReviewList;
};

interface updateMyReviewFail extends Error{ 
    type:'UPDATE_MY_REVIEW_FAIL';
};