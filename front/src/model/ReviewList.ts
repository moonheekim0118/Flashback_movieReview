import { MovieList } from './MovieList';
import { AuthorInfo } from './MyInfo';
import { Ratings } from './Ratings';

export interface ReviewList {
  id: string;
  User: AuthorInfo;
  Movie: MovieList;
  rating: Ratings;
  shortComment: string;
  character: string;
  line: string;
  scene: string;
  freeComment: string;
}
