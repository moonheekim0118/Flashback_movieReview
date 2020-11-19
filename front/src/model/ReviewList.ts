import { MovieList } from './MovieList';

export interface ReviewList { 
    id:string;
    movieInfo:MovieList,
    rating:string;
    shortComment:string;
    chracter:string;
    line:string;
    scene:string;
    freeComment:string;
};