import { MovieList } from './MovieList';
import { AuthorInfo } from './MyInfo';

export interface ReviewList { 
    id:string;
    User:AuthorInfo;
    Movie:MovieList,
    rating:string;
    shortComment:string;
    character:string;
    line:string;
    scene:string;
    freeComment:string;
};