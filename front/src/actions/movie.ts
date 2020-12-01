import { MovieList } from '../model/MovieList';

// 영화 리스트 
export const LOAD_MOVIES_REQUEST="LOAD_MOVIES_REQUEST";
export const LOAD_MOVIES_SUCCESS="LOAD_MOVIES_SUCCESS";
export const LOAD_MOVIES_FAIL="LOAD_MOVIES_FAIL";

// 연관검색어
export const LOAD_RELATED_SEARCH_REQUEST="LOAD_RELATED_SEARCH_REQUEST";
export const LOAD_RELATED_SEARCH_SUCCESS="LOAD_RELATED_SEARCH_SUCCESS";
export const LOAD_RELATED_SEARCH_FAIL="LOAD_RELATED_SEARCH_FAIL";

//영화 저장
export const SAVE_MOVIE="SAVE_MOVIE";

type MovieListArray = Array<MovieList>;

export type Action = 
{ type:'LOAD_MOVIES_REQUEST', data:{title:string, start:number}} | 
{ type:'LOAD_MOVIES_SUCCESS', data:MovieListArray} | 
{ type:'LOAD_MOVIES_FAIL', error:string} | 
{ type:'LOAD_RELATED_SEARCH_REQUEST', data:string} | 
{ type:'LOAD_RELATED_SEARCH_SUCCESS', data:MovieListArray} |
{ type:'LOAD_RELATED_SEARCH_FAIL',  error:string} |
{ type:'SAVE_MOVIE', data:MovieList};