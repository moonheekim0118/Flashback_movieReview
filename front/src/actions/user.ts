import { MyInfo } from '../model/MyInfo';
import { MovieList } from '../model/MovieList';
import Error from '../model/Error';

// login actions 
export const LOGIN_REQUEST="LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS="LOGIN_SUCCESS" as const;
export const LOGIN_FAIL="LOGIN_FAIL" as const;

// logout actions
export const LOGOUT_REQUEST="LOGOUT_REQUEST" as const;
export const LOGOUT_SUCCESS="LOGOUT_SUCCESS" as const;
export const LOGOUT_FAIL="LOGOUT_FAIL" as const;

// signup actions 
export const SIGNUP_REQUEST="SIGNUP_REQUEST" as const;
export const SIGNUP_SUCCESS="SIGNUP_SUCCESS" as const;
export const SIGNUP_FAIL="SIGNUP_FAIL" as const;


// loadMyInfo
export const LOAD_MY_INFO_REQUEST="LOAD_MY_INFO_REQUEST" as const;
export const LOAD_MY_INFO_SUCCESS="LOAD_MY_INFO_SUCCESS" as const;
export const LOAD_MY_INFO_FAIL="LOAD_MY_INFO_FAIL" as const;


// update Nickname
export const UPDATE_NICKNAME_REQUEST="UPDATE_NICKNAME_REQUEST" as const;
export const UPDATE_NICKNAME_SUCCESS="UPDATE_NICKNAME_SUCCESS" as const;
export const UPDATE_NICKNAME_FAIL="UPDATE_NICKNAME_FAIL" as const;


// update profilePic
export const UPDATE_PROFILE_PIC_REQUEST="UPDATE_PROFILE_PIC_REQUEST" as const;
export const UPDATE_PROFILE_PIC_SUCCESS="UPDATE_PROFILE_PIC_SUCCESS" as const;
export const UPDATE_PROFILE_PIC_FAIL="UPDATE_PROFILE_PIC_FAIL" as const;


// 인생영화 등록하기
export const ADD_FAVORITE_MOVIE_REQUEST="ADD_FAVORITE_MOVIE_REQUEST" as const;
export const ADD_FAVORITE_MOVIE_SUCCESS="ADD_FAVORITE_MOVIE_SUCCESS" as const;
export const ADD_FAVORITE_MOVIE_FAIL="ADD_FAVORITE_MOVIE_FAIL" as const;

// 인생영화 로딩
export const LOAD_FAVORITE_MOVIE_REQUEST="LOAD_FAVORITE_MOVIE_REQUEST" as const;
export const LOAD_FAVORITE_MOVIE_SUCCESS="LOAD_FAVORITE_MOVIE_SUCCESS" as const;
export const LOAD_FAVORITE_MOVIE_FAIL="LOAD_FAVORITE_MOVIE_FAIL" as const;

// 인생영화 삭제
export const REMOVE_FAVORITE_MOVIE_REQUEST="REMOVE_FAVORITE_MOVIE_REQUEST" as const;
export const REMOVE_FAVORITE_MOVIE_SUCCESS="REMOVE_FAVORITE_MOVIE_SUCCESS" as const;
export const REMOVE_FAVORITE_MOVIE_FAIL="REMOVE_FAVORITE_MOVIE_FAIL" as const;


export const loginAction=(data:loginRequestData)=>{
    return {
        type:LOGIN_REQUEST,
        data:data
    }
};

export const logoutAction=()=>{
    return {
        type:LOGOUT_REQUEST
    }
};

export const signUpAction=(data:signUpRequestData)=>{
    return {
        type:SIGNUP_REQUEST,
        data:data
    }
};

export const updateNicknameAction=(data:{nickname:string})=>{
    return {
        type:UPDATE_NICKNAME_REQUEST,
        data:data
    }
};

export const updateProfilePicAction=(data:FormData)=>{
    return {
        type:UPDATE_PROFILE_PIC_REQUEST,
        data:data
    }
};


export const loadMyInfoAction=()=>{
    return {
        type:LOAD_MY_INFO_REQUEST
    }
};

export const addFavoriteMovieAction=(data:MovieList)=>{
    return{
        type:ADD_FAVORITE_MOVIE_REQUEST,
        data:data
    }
};

export const loadFavoriteMovieAction=()=>{
    return{
        type:LOAD_FAVORITE_MOVIE_REQUEST
    }
};

export const removeFavoriteMovieAction=(data:string)=>{
    return{
        type:REMOVE_FAVORITE_MOVIE_REQUEST,
        data:data
    }
};




export type Action = 
| ReturnType <typeof loginAction>
| ReturnType <typeof signUpAction>
| ReturnType <typeof logoutAction>
| ReturnType <typeof updateNicknameAction>
| ReturnType <typeof updateProfilePicAction>
| ReturnType <typeof loadMyInfoAction>
| ReturnType <typeof addFavoriteMovieAction>
| ReturnType <typeof loadFavoriteMovieAction>
| ReturnType <typeof removeFavoriteMovieAction>
| loginSuccess 
| loginFail 
| logoutSuccess 
| logoutFail 
| signUpSuccess 
| signUpFail 
| loadMyInfoSuccess 
| loadMyInfoFail 
| updateNicknameSuccess 
| updateNicknameFail 
| updateProfilePicSuccess 
| updateProfilePicFail 
| addFavoriteMovieSuccess 
| addFavoriteMovieFail 
| loadFavoriteMovieSuccess 
| loadFavoriteMovieFail
| removeFavoriteMovieSuccess 
| removeFavoriteMovieFail ;

type loginRequestData = { email : string , password: string};
type signUpRequestData = { email : string, nickname:string, password: string}
type MovieListArray = Array<MovieList>;

interface loginSuccess {
    type:'LOGIN_SUCCESS';
    data:MyInfo;
};

interface loginFail extends Error {
    type:'LOGIN_FAIL';
};


interface logoutSuccess {
    type:'LOGOUT_SUCCESS';
};

interface logoutFail extends Error  {
    type:'LOGOUT_FAIL';
};

interface signUpSuccess {
    type:'SIGNUP_SUCCESS';
};

interface signUpFail extends Error  {
    type:'SIGNUP_FAIL';
};


interface loadMyInfoSuccess {
    type:'LOAD_MY_INFO_SUCCESS';
    data:MyInfo;
};

interface loadMyInfoFail extends Error {
    type:'LOAD_MY_INFO_FAIL';
};

interface updateNicknameSuccess {
    type:'UPDATE_NICKNAME_SUCCESS';
    data:string;
};


interface updateNicknameFail extends Error {
    type:'UPDATE_NICKNAME_FAIL';
};


interface updateProfilePicSuccess {
    type:'UPDATE_PROFILE_PIC_SUCCESS';
    data:string;
};


interface updateProfilePicFail extends Error {
    type:'UPDATE_PROFILE_PIC_FAIL';
};


interface addFavoriteMovieSuccess {
    type:'ADD_FAVORITE_MOVIE_SUCCESS';
    data:MovieList;
};

interface addFavoriteMovieFail extends Error {
    type:'ADD_FAVORITE_MOVIE_FAIL';
};


interface loadFavoriteMovieSuccess {
    type:'LOAD_FAVORITE_MOVIE_SUCCESS';
    data:MovieListArray;
};

interface loadFavoriteMovieFail extends Error{
    type:'LOAD_FAVORITE_MOVIE_FAIL';
};


interface removeFavoriteMovieSuccess {
    type:'REMOVE_FAVORITE_MOVIE_SUCCESS';
    data:string;
};

interface removeFavoriteMovieFail extends Error {
    type:'REMOVE_FAVORITE_MOVIE_FAIL';
};