import { MovieList } from '../model/MovieList';
import Error from '../model/Error';

// 영화 리스트
export const LOAD_MOVIES_REQUEST = 'LOAD_MOVIES_REQUEST' as const;
export const LOAD_MOVIES_SUCCESS = 'LOAD_MOVIES_SUCCESS' as const;
export const LOAD_MOVIES_FAIL = 'LOAD_MOVIES_FAIL' as const;

// 연관검색어
export const LOAD_RELATED_SEARCH_REQUEST = 'LOAD_RELATED_SEARCH_REQUEST' as const;
export const LOAD_RELATED_SEARCH_SUCCESS = 'LOAD_RELATED_SEARCH_SUCCESS' as const;
export const LOAD_RELATED_SEARCH_FAIL = 'LOAD_RELATED_SEARCH_FAIL' as const;

//영화 저장
export const SAVE_MOVIE = 'SAVE_MOVIE' as const;

export const LoadMovieAction = (data: {
  title: string | string[];
  start: number;
}) => {
  return {
    type: LOAD_MOVIES_REQUEST,
    data: data,
  };
};

export const LoadRelatedSearchAction = (data: string) => {
  return {
    type: LOAD_RELATED_SEARCH_REQUEST,
    data: data,
  };
};

export const SaveMovieAction = (data: MovieList) => {
  return {
    type: SAVE_MOVIE,
    data: data,
  };
};

export type Action =
  | ReturnType<typeof LoadMovieAction>
  | ReturnType<typeof LoadRelatedSearchAction>
  | ReturnType<typeof SaveMovieAction>
  | LoadMovieSuccess
  | LoadMovieFail
  | LoadRelatedSearchSuccess
  | LoadRelatedSearchFail;

type MovieListArray = Array<MovieList>;

interface LoadMovieSuccess {
  type: 'LOAD_MOVIES_SUCCESS';
  data: MovieListArray;
}

interface LoadMovieFail extends Error {
  type: 'LOAD_MOVIES_FAIL';
}

interface LoadRelatedSearchSuccess {
  type: 'LOAD_RELATED_SEARCH_SUCCESS';
  data: MovieListArray;
}

interface LoadRelatedSearchFail extends Error {
  type: 'LOAD_RELATED_SEARCH_FAIL';
}
