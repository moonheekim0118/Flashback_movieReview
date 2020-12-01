import { MyInfo } from '../model/MyInfo';
import { MovieList } from '../model/MovieList';

// login actions 
export const LOGIN_REQUEST="LOGIN_REQUEST";
export const LOGIN_SUCCESS="LOGIN_SUCCESS"
export const LOGIN_FAIL="LOGIN_FAIL";

// logout actions
export const LOGOUT_REQUEST="LOGOUT_REQUEST";
export const LOGOUT_SUCCESS="LOGOUT_SUCCESS";
export const LOGOUT_FAIL="LOGOUT_FAIL";

// signup actions 
export const SIGNUP_REQUEST="SIGNUP_REQUEST";
export const SIGNUP_SUCCESS="SIGNUP_SUCCESS"
export const SIGNUP_FAIL="SIGNUP_FAIL";


// loadMyInfo
export const LOAD_MY_INFO_REQUEST="LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS="LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAIL="LOAD_MY_INFO_FAIL";


// update Nickname
export const UPDATE_NICKNAME_REQUEST="UPDATE_NICKNAME_REQUEST";
export const UPDATE_NICKNAME_SUCCESS="UPDATE_NICKNAME_SUCCESS";
export const UPDATE_NICKNAME_FAIL="UPDATE_NICKNAME_FAIL";


// update profilePic
export const UPDATE_PROFILE_PIC_REQUEST="UPDATE_PROFILE_PIC_REQUEST";
export const UPDATE_PROFILE_PIC_SUCCESS="UPDATE_PROFILE_PIC_SUCCESS";
export const UPDATE_PROFILE_PIC_FAIL="UPDATE_PROFILE_PIC_FAIL";


// 인생영화 등록하기
export const ADD_FAVORITE_MOVIE_REQUEST="ADD_FAVORITE_MOVIE_REQUEST";
export const ADD_FAVORITE_MOVIE_SUCCESS="ADD_FAVORITE_MOVIE_SUCCESS";
export const ADD_FAVORITE_MOVIE_FAIL="ADD_FAVORITE_MOVIE_FAIL";

// 인생영화 로딩
export const LOAD_FAVORITE_MOVIE_REQUEST="LOAD_FAVORITE_MOVIE_REQUEST";
export const LOAD_FAVORITE_MOVIE_SUCCESS="LOAD_FAVORITE_MOVIE_SUCCESS";
export const LOAD_FAVORITE_MOVIE_FAIL="LOAD_FAVORITE_MOVIE_FAIL";

// 인생영화 삭제
export const REMOVE_FAVORITE_MOVIE_REQUEST="REMOVE_FAVORITE_MOVIE_REQUEST";
export const REMOVE_FAVORITE_MOVIE_SUCCESS="REMOVE_FAVORITE_MOVIE_SUCCESS";
export const REMOVE_FAVORITE_MOVIE_FAIL="REMOVE_FAVORITE_MOVIE_FAIL";

type loginRequestData = { email : string , password: string};
type signUpRequestData = { email : string, nickname:string, password: string}
type MovieListArray = Array<MovieList>;

export type Action = 
{ type:'LOGIN_REQUEST' , data:loginRequestData} | 
{ type:'LOGIN_SUCCESS', data:MyInfo} | 
{ type:'LOGIN_FAIL', error:string} | 
{ type:'LOGOUT_REQUEST'} | 
{ type:'LOGOUT_SUCCESS'} |
{ type:'LOGOUT_FAIL', error:string} |
{ type:'SIGNUP_REQUEST', data:signUpRequestData} |
{ type:'SIGNUP_SUCCESS'} |
{ type:'SIGNUP_FAIL', error:string} |
{ type:'LOAD_MY_INFO_REQUEST'} |
{ type:'LOAD_MY_INFO_SUCCESS', data:MyInfo} |
{ type:'LOAD_MY_INFO_FAIL',error:string} |
{ type:'UPDATE_NICKNAME_REQUEST', data:{ nickname: string}} |
{ type:'UPDATE_NICKNAME_SUCCESS', data:string} |
{ type:'UPDATE_NICKNAME_FAIL', error:string} |
{ type:'UPDATE_PROFILE_PIC_REQUEST', data:FormData} |
{ type:'UPDATE_PROFILE_PIC_SUCCESS', data:string} |
{ type:'UPDATE_PROFILE_PIC_FAIL', error:string} |
{ type:'ADD_FAVORITE_MOVIE_REQUEST', data:MovieList} |
{ type:'ADD_FAVORITE_MOVIE_SUCCESS', data:MovieList } |
{ type:'ADD_FAVORITE_MOVIE_FAIL', error:string} |
{ type:'LOAD_FAVORITE_MOVIE_REQUEST'} |
{ type:'LOAD_FAVORITE_MOVIE_SUCCESS', data:MovieListArray} |
{ type:'LOAD_FAVORITE_MOVIE_FAIL', error:string} |
{ type:'REMOVE_FAVORITE_MOVIE_REQUEST', data:string} |
{ type:'REMOVE_FAVORITE_MOVIE_SUCCESS', data:string} |
{ type:'REMOVE_FAVORITE_MOVIE_FAIL', error:string} ;