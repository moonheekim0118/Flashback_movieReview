import * as type from '../actions/alert';
import { Alert } from '../model/State';
import { produce } from 'immer';

export const initialState: Alert = {
  showAlert: false,
  message: '',
};

const reducer = (state: Alert = initialState, action: type.Action): Alert => {
  return produce(state, (draft) => {
    switch (action.type) {
      case type.OPEN_ALERT:
        draft.showAlert = true;
        draft.message = action.data; // alert 메시지
        break;

      case type.CLOSE_ALERT:
        draft.showAlert = false;
        break;
    }
  });
};

export default reducer;
