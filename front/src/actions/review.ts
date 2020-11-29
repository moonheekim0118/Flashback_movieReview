import { ReviewList } from '../model/ReviewList';
import { MovieList } from '../model/MovieList';

// loadMyReviews
export const LOAD_MY_REVIEWS_REQUEST="LOAD_MY_REVIEWS_REQUEST";
export const LOAD_MY_REVIEWS_SUCCESS="LOAD_MY_REVIEWS_SUCCESS";
export const LOAD_MY_REVIEWS_FAIL="LOAD_MY_REVIEWS_FAIL";

// load single Review
export const LOAD_SINGLE_REVIEW_REQUEST="LOAD_SINGLE_REVIEW_REQUEST";
export const LOAD_SINGLE_REVIEW_SUCCESS="LOAD_SINGLE_REVIEW_SUCCESS";
export const LOAD_SINGLE_REVIEW_FAIL="LOAD_SINGLE_REVIEW_FAIL";

// add My reviews
export const ADD_MY_REVIEW_REQUEST="ADD_MY_REVIEW_REQUEST";
export const ADD_MY_REVIEW_SUCCESS="ADD_MY_REVIEW_SUCCESS";
export const ADD_MY_REVIEW_FAIL="ADD_MY_REVIEW_FAIL";

// remove my Review
export const REMOVE_MY_REVIEW_REQUEST="REMOVE_MY_REVIEW_REQUEST";
export const REMOVE_MY_REVIEW_SUCCESS="REMOVE_MY_REVIEW_SUCCESS";
export const REMOVE_MY_REVIEW_FAIL="REMOVE_MY_REVIEW_FAIL";

//update my Review
export const UPDATE_MY_REVIEW_REQUEST="UPDATE_MY_REVIEW_REQUEST";
export const UPDATE_MY_REVIEW_SUCCESS="UPDATE_MY_REVIEW_SUCCESS";
export const UPDATE_MY_REVIEW_FAIL="UPDATE_MY_REVIEW_FAIL";

type ReviewListArray = Array<ReviewList>;
type Review = { Movie: MovieList , rating : string, shortComment: string,
              character:string, line: string, scene: string, freeComment:string};
        

export type Action = 
{ type:'LOAD_MY_REVIEWS_REQUEST'} | 
{ type:'LOAD_MY_REVIEWS_SUCCESS', data:ReviewListArray} | 
{ type:'LOAD_MY_REVIEWS_FAIL', error:string} | 
{ type:'LOAD_SINGLE_REVIEW_REQUEST', data:string} |
{ type:'LOAD_SINGLE_REVIEW_SUCCESS', data:ReviewList} |
{ type:'LOAD_SINGLE_REVIEW_FAIL', error:string} |
{ type:'ADD_MY_REVIEW_REQUEST', data:Review} |
{ type:'ADD_MY_REVIEW_SUCCESS', data:ReviewList} |
{ type:'ADD_MY_REVIEW_FAIL', error:string} |
{ type:'REMOVE_MY_REVIEW_REQUEST', data:string} |
{ type:'REMOVE_MY_REVIEW_SUCCESS', data:string} |
{ type:'REMOVE_MY_REVIEW_FAIL', error:string} |
{ type:'UPDATE_MY_REVIEW_REQUEST', data:ReviewList} |
{ type:'UPDATE_MY_REVIEW_SUCCESS', data:ReviewList} |
{ type:'UPDATE_MY_REVIEW_FAIL', error:string} |
{ type:'SIGNUP_FAIL', error:string} 
;