import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../actions/user';
import { openAlertAction } from '../../../actions/alert';
import SignInput, { InputType, Form } from '../SignInput';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const [email, setEmail] = useInput(''); // 이메일
  const [password, setPassword] = useInput(''); // 패스워드

  useEffect(() => {
    // 로그인 에러 alert
    if (loginError) {
      dispatch(openAlertAction(loginError));
    }
  }, [loginError]);

  // submit
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginAction({ email, password }));
    },
    [email, password]
  );

  return (
    <Form>
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
      />
      <br />
      <Button
        fill={true}
        shadow={true}
        disabled={email.length === 0 || password.length === 0}
        color="purple"
        onClick={onSubmit}
        title="로그인"
      />
      <br />
    </Form>
  );
};

export default LoginForm;
