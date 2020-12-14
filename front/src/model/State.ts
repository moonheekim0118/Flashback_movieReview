import { MovieList } from './MovieList';
import { ReviewList } from './ReviewList';
import { MyInfo } from './MyInfo';

export interface Alert {
    showAlert:boolean;
    message:string;
};


export interface Movie {
    loadMoviesLoading,
    loadMoviesDone, 
    hasMoreMovies,
    loadRelatedSearchLoading,
    loadRelatedSearchDone: boolean;

    loadMoviesError,
    loadRelatedSearchError:string;

    singleMovie:MovieList
    movieLists,
    searchLists:Array<MovieList>,
}


export interface Review { 
    loadMyReviewsLoading,
    loadMyReviewsDone,
    hasMoreReviews,
    loadSingleReviewLoading,
    loadSingleReviewDone,
    addMyReviewLoading,
    addMyReviewDone,
    removeMyReviewLoading,
    removeMyReviewDone,
    updateMyReviewLoading,
    updateMyReviewDone : boolean;

    loadMyReviewsError,
    loadSingleReviewError,
    addMyReviewError,
    removeMyReviewError,
    updateMyReviewError:string;

    myReviews:Array<ReviewList>;
    singleReview:ReviewList;
}


export interface User {
    loginDone,
    loginLoading,
    logoutDone,
    logoutLoading,
    signUpDone,
    signUpLoading,
    loadMyInfoDone,
    loadMyInfoLoading,
    updateNicknameDone,
    updateNicknameLoading,
    updateProfilePicDone,
    updateProfilePicLoading,
    addFavoriteMovieDone,
    addFavoriteMovieLoading,
    loadFavoriteMovieDone,
    loadFavoriteMovieLoading,
    removeFavoriteMovieDone,
    removeFavoriteMovieLoading:boolean;

    loginError,
    logoutError,
    signUpError,
    loadMyInfoError,
    updateNicknameError,
    updateProfilePicError,
    addFavoriteMovieError,
    loadFavoriteMovieError,
    removeFavoriteMovieError:string;


    myInfo:MyInfo,
    favoriteMovies:Array<MovieList>;
}