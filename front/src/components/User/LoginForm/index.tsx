import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../actions/user';
import SignInput, { InputType, Form } from '../SignInput';
import usePopup from '../../../hooks/usePopup';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const [email, setEmail] = useInput(''); // 이메일
  const [password, setPassword] = useInput(''); // 패스워드

  usePopup({ error: loginError }); // 로그인 에러 alert

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
        onClick={onSubmit}>
        로그인
      </Button>
      <br />
    </Form>
  );
};

export default LoginForm;
