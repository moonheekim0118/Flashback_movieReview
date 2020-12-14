import { MovieList } from './MovieList';
import { ReviewList } from './ReviewList';
import { MyInfo } from './MyInfo';

export interface Alert {
  showAlert: boolean;
  message: string;
}

export interface Movie {
  loadMoviesLoading: boolean;
  loadMoviesDone: boolean;
  hasMoreMovies: boolean;
  loadRelatedSearchLoading: boolean;
  loadRelatedSearchDone: boolean;

  loadMoviesError: string;
  loadRelatedSearchError: string;

  singleMovie: MovieList;
  movieLists: Array<MovieList>;
  searchLists: Array<MovieList>;
}

export interface Review {
  loadMyReviewsLoading: boolean;
  loadMyReviewsDone: boolean;
  hasMoreReviews: boolean;
  loadSingleReviewLoading: boolean;
  loadSingleReviewDone: boolean;
  addMyReviewLoading: boolean;
  addMyReviewDone: boolean;
  removeMyReviewLoading: boolean;
  removeMyReviewDone: boolean;
  updateMyReviewLoading: boolean;
  updateMyReviewDone: boolean;

  loadMyReviewsError: string;
  loadSingleReviewError: string;
  addMyReviewError: string;
  removeMyReviewError: string;
  updateMyReviewError: string;

  myReviews: Array<ReviewList>;
  singleReview: ReviewList;
}

export interface User {
  loginDone: boolean;
  loginLoading: boolean;
  logoutDone: boolean;
  logoutLoading: boolean;
  signUpDone: boolean;
  signUpLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoLoading: boolean;
  updateNicknameDone: boolean;
  updateNicknameLoading: boolean;
  updateProfilePicDone: boolean;
  updateProfilePicLoading: boolean;
  addFavoriteMovieDone: boolean;
  addFavoriteMovieLoading: boolean;
  loadFavoriteMovieDone: boolean;
  loadFavoriteMovieLoading: boolean;
  removeFavoriteMovieDone: boolean;
  removeFavoriteMovieLoading: boolean;

  loginError: string;
  logoutError: string;
  signUpError: string;
  loadMyInfoError: string;
  updateNicknameError: string;
  updateProfilePicError: string;
  addFavoriteMovieError: string;
  loadFavoriteMovieError: string;
  removeFavoriteMovieError: string;

  myInfo: MyInfo;
  favoriteMovies: Array<MovieList>;
}
