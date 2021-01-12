import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openAlertAction } from '../../../actions/alert';
import { updateNicknameAction } from '../../../actions/user';
import useValidation from '../../../hooks/useValidation';
import SignInput, { InputType } from '../SignInput';
import Button from '../../../atoms/Buttons';
import styled from 'styled-components';

interface Props {
  exNickname: string;
}
const NicknameChange = ({ exNickname }: Props) => {
  const dispatch = useDispatch();

  const [
    nickname, // 닉네임
    setNickname,
    nicknameError,
  ] = useValidation(exNickname, 2, 6);

  const onChangeNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateNicknameAction({ nickname: nickname }));
      dispatch(openAlertAction('닉네임이 변경되었습니다.')); // 확인 alert
    },
    [nickname]
  );

  return (
    <Form>
      <SignInput
        name="nickname"
        label="닉네임"
        value={nickname}
        onChange={setNickname}
        type={InputType.Text}
        Error={nicknameError}
      />
      <ButtonContainer>
        <Button
          title="수정"
          onClick={onChangeNickname}
          disabled={nicknameError || nickname === exNickname}
        />
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: auto;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  flex-basis: 40%;
`;

export default NicknameChange;
