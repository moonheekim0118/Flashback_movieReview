import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction } from '../../../actions/user';
import { openAlertAction } from '../../../actions/alert';
import SignInput, { InputType, Form } from '../SignInput';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';
import useValidation from '../../../hooks/useValidation';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const signUpError = useSelector((state) => state.user.signUpError);

  const [email, setEmail] = useInput('');

  const [
    nickname, // 닉네임
    setNickname,
    nicknameLengthError,
  ] = useValidation('', 2, 6);

  const [
    password, // 비밀번호
    setPassword,
    passwordLengthError,
  ] = useValidation('', 6, 15);

  const [checkpassword, setCheckpassword] = useState<string>(''); // 확인용 비밀번호

  const [passwordError, setPasswordError] = useState<boolean>(false); // 비밀번호 불일치 에러

  // 회원가입 에러 alert
  useEffect(() => {
    if (signUpError) {
      dispatch(openAlertAction(signUpError));
    }
  }, [signUpError]);

  // submit
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUpAction({ email, nickname, password }));
    },
    [email, nickname, password, checkpassword]
  );

  // 비밀번호 변경
  const onChangeCheckPassword = useCallback(
    (e) => {
      setCheckpassword(e.target.value);
      setPasswordError(e.target.value !== password); // 비밀번호가 불일치 할 경우
    },
    [password]
  );

  return (
    <Form>
      <SignInput
        name="nickname"
        label="닉네임"
        value={nickname}
        onChange={setNickname}
        type={InputType.Text}
        Error={nicknameLengthError}
      />
      <SignInput
        name="email"
        label="이메일"
        value={email}
        onChange={setEmail}
        type={InputType.Text}
      />
      <SignInput
        name="password"
        label="비밀번호"
        value={password}
        onChange={setPassword}
        type={InputType.Password}
        Error={passwordLengthError}
      />
      <SignInput
        name="passwordcheck"
        label="비밀번호 확인"
        value={checkpassword}
        onChange={onChangeCheckPassword}
        type={InputType.Password}
        Error={passwordError}
      />
      <br />
      <Button
        fill={true}
        shadow={true}
        disabled={nicknameLengthError || passwordLengthError || passwordError}
        color="purple"
        onClick={onSubmit}
        title="회원가입"
      />
    </Form>
  );
};

export default SignUpForm;
