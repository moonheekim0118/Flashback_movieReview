import React from 'react';
import styled from 'styled-components';

// Input 타입
export enum InputType {
  Text = 'Text',
  Password = 'Password',
}

// Error 타입 - name에 따라 변경되는 에러 메시지
enum ErrorType {
  nickname = '닉네임은 2글자 이상 6글자 이하여야 합니다.',
  password = '비밀번호는 6글자 이상 15글자 이하여야 합니다.',
  passwordcheck = '비밀번호가 일치하지 않습니다.',
}

// PlaceHolder 타입 - name에 따라 변경되는 placeholder
enum PlaceholderType {
  nickname = '닉네임을 입력해주세요',
  email = 'example@example.com',
  password = '비밀번호를 입력해주세요',
  passwordcheck = '비밀번호를 확인해주세요',
}

interface Props {
  name: string;
  value: string;
  onChange: (e: any) => void;
  label: string;
  type: InputType;
  Error?: boolean;
}

const SignInput = ({
  name,
  value,
  onChange,
  label,
  type,
  Error = false,
}: Props) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      {type === InputType.Text ? (
        <TextInput
          name={name}
          value={value}
          placeholder={PlaceholderType[name]}
          onChange={onChange}
        />
      ) : (
        <PasswordInput
          name={name}
          value={value}
          placeholder={PlaceholderType[name]}
          onChange={onChange}
        />
      )}
      {Error && <ErrorMessage>{ErrorType[name]}</ErrorMessage>}
    </Container>
  );
};

export const Form = styled.form`
  width: 75%;
  margin: 0 auto;
  padding-top: 80px;
  background-color: inherit;
  color: inherit;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  flex-direction: column;
  padding-bottom: 50px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 10px 15px;
  font-size: 1.2rem;
  margin-top: 15px;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  background-color: inherit;
  color: inherit;
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  background-color: inherit;
  color: inherit;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.span`
  color: red;
  padding-top: 10px;
  font-size: 1rem;
`;

export default SignInput;
