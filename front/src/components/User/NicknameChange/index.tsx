import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNicknameAction } from '../../../actions/user';
import useValidation from '../../../hooks/useValidation';
import usePopup from '../../../hooks/usePopup';
import Messages from '../../../util/alertMessages';
import SignInput, { InputType } from '../SignInput';
import Button from '../../../atoms/Buttons';
import styled from 'styled-components';

interface Props {
  exNickname: string;
}
const NicknameChange = ({ exNickname }: Props) => {
  const dispatch = useDispatch();
  const { updateNicknameDone, updateNicknameError } = useSelector(
    (state) => state.user
  );

  const [
    nickname, // 닉네임
    setNickname,
    nicknameError,
  ] = useValidation(exNickname, 2, 6);

  const onChangeNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateNicknameAction({ nickname: nickname }));
    },
    [nickname]
  );

  usePopup({
    done: updateNicknameDone,
    error: updateNicknameError,
    message: Messages.updateNickname,
  }); // 닉네임 수정 alert

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
          onClick={onChangeNickname}
          disabled={nicknameError || nickname === exNickname}>
          수정
        </Button>
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
  flex-basis: 40%;
`;

export default NicknameChange;
