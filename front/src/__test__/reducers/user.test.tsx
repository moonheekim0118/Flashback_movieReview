import reducer from '../../reducers/user';
import { MovieProp, MyInfoProp } from '../components/mock.data';
import { Logindata, SignUpData } from './mock.data';
import * as type from '../../actions/user';

function FormDataMock() {
  this.append = jest.fn();
}
const FormData = FormDataMock;

describe('alert reducer', () => {
  let draft;
  beforeEach(() => {
    draft = {
      loginDone: false,
      loginLoading: false,
      loginError: null,
      logoutDone: false,
      logoutLoading: false,
      logoutError: null,
      signUpDone: false,
      signUpLoading: false,
      signUpError: null,
      loadMyInfoDone: false,
      loadMyInfoLoading: false,
      loadMyInfoError: null,
      updateNicknameDone: false,
      updateNicknameLoading: false,
      updateNicknameError: null,
      updateProfilePicDone: false,
      updateProfilePicLoading: false,
      updateProfilePicError: null,
      addFavoriteMovieDone: false,
      addFavoriteMovieLoading: false,
      addFavoriteMovieError: null,
      loadFavoriteMovieDone: false,
      loadFavoriteMovieLoading: false,
      loadFavoriteMovieError: null,
      removeFavoriteMovieDone: false,
      removeFavoriteMovieLoading: false,
      removeFavoriteMovieError: null,
      myInfo: null,
      favoriteMovies: [],
    };
  });

  it('should request login', () => {
    // 로그인 리퀘스트
    draft.loginLoading = true;
    expect(
      reducer(undefined, {
        type: type.LOGIN_REQUEST,
        data: Logindata,
      })
    ).toEqual(draft);
  });

  it('should succeed login', () => {
    // 로그인 성공
    draft.myInfo = MyInfoProp;
    draft.loginDone = true;
    expect(
      reducer(undefined, {
        type: type.LOGIN_SUCCESS,
        data: MyInfoProp,
      })
    ).toEqual(draft);
  });

  it('should fail login', () => {
    // 로그인 실패
    draft.loginError = 'test';
    expect(
      reducer(undefined, {
        type: type.LOGIN_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request logout', () => {
    // 로그아웃 리퀘스트
    draft.logoutLoading = true;
    expect(
      reducer(undefined, {
        type: type.LOGOUT_REQUEST,
      })
    ).toEqual(draft);
  });

  it('should succeed logout', () => {
    // 로그아웃 성공
    draft.logoutDone = true;
    expect(
      reducer(undefined, {
        type: type.LOGOUT_SUCCESS,
      })
    ).toEqual(draft);
  });

  it('should fail logout', () => {
    // 로그아웃 실패
    draft.logoutError = 'test';
    expect(
      reducer(undefined, {
        type: type.LOGOUT_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request signUp', () => {
    // 회원가입 리퀘스트
    draft.signUpLoading = true;
    expect(
      reducer(undefined, {
        type: type.SIGNUP_REQUEST,
        data: SignUpData,
      })
    ).toEqual(draft);
  });

  it('should succeed signUp', () => {
    // 회원가입 성공
    draft.signUpDone = true;
    expect(
      reducer(undefined, {
        type: type.SIGNUP_SUCCESS,
      })
    ).toEqual(draft);
  });

  it('should fail signUp', () => {
    // 회원가입 실패
    draft.signUpError = 'test';
    expect(
      reducer(undefined, {
        type: type.SIGNUP_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request load my Info', () => {
    // 내정보 로딩 리퀘스트
    draft.loadMyInfoLoading = true;
    expect(
      reducer(undefined, {
        type: type.LOAD_MY_INFO_REQUEST,
      })
    ).toEqual(draft);
  });

  it('should succeed load my Info', () => {
    // 내정보 로딩 성공
    draft.loadMyInfoDone = true;
    draft.loginDone = true;
    draft.myInfo = MyInfoProp;
    expect(
      reducer(undefined, {
        type: type.LOAD_MY_INFO_SUCCESS,
        data: MyInfoProp,
      })
    ).toEqual(draft);
  });

  it('should fail load my Info', () => {
    // 내정보 로딩 실패
    draft.loadMyInfoError = 'test';
    expect(
      reducer(undefined, {
        type: type.LOAD_MY_INFO_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request update nickname', () => {
    // 닉네임 변경 리퀘스트
    draft.updateNicknameLoading = true;
    expect(
      reducer(undefined, {
        type: type.UPDATE_NICKNAME_REQUEST,
        data: { nickname: 'newNickname' },
      })
    ).toEqual(draft);
  });

  it('should succeed update nickname', () => {
    // 닉네임 변경 성공
    draft.updateNicknameDone = true;
    expect(
      reducer(undefined, {
        type: type.UPDATE_NICKNAME_SUCCESS,
        data: 'newNickname',
      })
    ).toEqual(draft);
  });

  it('should fail update nickname', () => {
    // 닉네임 변경 실패
    draft.updateNicknameError = 'test';
    expect(
      reducer(undefined, {
        type: type.UPDATE_NICKNAME_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request update profilePic', () => {
    // 프로필 사진 변경 리퀘스트
    draft.updateProfilePicLoading = true;
    expect(
      reducer(undefined, {
        type: type.UPDATE_PROFILE_PIC_REQUEST,
        data: new FormData(),
      })
    ).toEqual(draft);
  });

  it('should succeed update profilePic', () => {
    // 프로필 사진 변경 성공
    draft.updateProfilePicDone = true;
    expect(
      reducer(undefined, {
        type: type.UPDATE_PROFILE_PIC_SUCCESS,
        data: 'test',
      })
    ).toEqual(draft);
  });

  it('should fail update profilePic', () => {
    // 프로필 사진 변경 실패
    draft.updateProfilePicError = 'test';
    expect(
      reducer(undefined, {
        type: type.UPDATE_PROFILE_PIC_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request add favorite Movie', () => {
    // 인생영화 등록 리퀘스트
    draft.addFavoriteMovieLoading = true;
    expect(
      reducer(undefined, {
        type: type.ADD_FAVORITE_MOVIE_REQUEST,
        data: MovieProp,
      })
    ).toEqual(draft);
  });

  it('should succeed add favorite Movie', () => {
    // 인생영화 등록 성공
    draft.addFavoriteMovieDone = true;
    draft.favoriteMovies.push(MovieProp);
    expect(
      reducer(undefined, {
        type: type.ADD_FAVORITE_MOVIE_SUCCESS,
        data: MovieProp,
      })
    ).toEqual(draft);
  });

  it('should fail add favorite Movie', () => {
    // 인생영화 등록 실패
    draft.addFavoriteMovieError = 'test';
    expect(
      reducer(undefined, {
        type: type.ADD_FAVORITE_MOVIE_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request load favorite Movie', () => {
    // 인생영화 로딩 리퀘스트
    draft.loadFavoriteMovieLoading = true;
    expect(
      reducer(undefined, {
        type: type.LOAD_FAVORITE_MOVIE_REQUEST,
      })
    ).toEqual(draft);
  });

  it('should succeed load favorite Movie', () => {
    // 인생영화 로딩  성공
    draft.loadFavoriteMovieDone = true;
    draft.favoriteMovies = [MovieProp];
    expect(
      reducer(undefined, {
        type: type.LOAD_FAVORITE_MOVIE_SUCCESS,
        data: [MovieProp],
      })
    ).toEqual(draft);
  });

  it('should fail load favorite Movie', () => {
    // 인생영화 로딩 실패
    draft.loadFavoriteMovieError = 'test';
    expect(
      reducer(undefined, {
        type: type.LOAD_FAVORITE_MOVIE_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });

  it('should request remove favorite Movie', () => {
    // 인생영화 삭제 리퀘스트
    draft.removeFavoriteMovieLoading = true;
    expect(
      reducer(undefined, {
        type: type.REMOVE_FAVORITE_MOVIE_REQUEST,
        data: 'id',
      })
    ).toEqual(draft);
  });

  it('should succeed remove favorite Movie', () => {
    // 인생영화 삭제 성공
    draft.removeFavoriteMovieDone = true;
    expect(
      reducer(undefined, {
        type: type.REMOVE_FAVORITE_MOVIE_SUCCESS,
        data: 'id',
      })
    ).toEqual(draft);
  });

  it('should fail remove favorite Movie', () => {
    // 인생영화 삭제 실패
    draft.removeFavoriteMovieError = 'test';
    expect(
      reducer(undefined, {
        type: type.REMOVE_FAVORITE_MOVIE_FAIL,
        error: 'test',
      })
    ).toEqual(draft);
  });
});
