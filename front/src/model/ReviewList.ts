import { MovieList } from './MovieList';
import { MyInfo } from './MyInfo';

export interface ReviewList { 
    id:string;
    author:MyInfo;
    movieInfo:MovieList,
    rating:string;
    shortComment:string;
    character:string;
    line:string;
    scene:string;
    freeComment:string;
};