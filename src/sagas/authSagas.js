import { put, call } from 'redux-saga/effects';
import types from '../constants/actionTypes';
import auth from '@react-native-firebase/auth';
import { getTokenResult } from '../apis/api';

const okLogin = (confirmation) => ({
  type: types.LOGIN_SUCCESS,
});

const errLogin = ({ message, status }) => {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      message,
    }
  };
};

const firebaseSignInWithPhoneNumber = (phoneNumber) => {
  return auth().signInWithPhoneNumber(phoneNumber);
};
export function* loginSaga({ payload }) {
  try {
    console.log("TCL: function*loginSaga -> payload", payload)
    const result = yield call(getTokenResult, payload);

    yield put(okLogin());
  } catch (error) {
    const errorAction = errLogin(error);
    yield put(errorAction);
  }
}

const okGet = (confirmation) => ({
  type: types.GET_CONFIRMATION_CODE_SUCCESS,
  payload: confirmation
});

const errGet = ({ message, status }) => {
  return {
    type: types.GET_CONFIRMATION_CODE_ERROR,
    payload: {
      message
    }
  };
};

export function* getConfirmCodeSaga({ payload }) {
  try {
    const confirmation = yield firebaseSignInWithPhoneNumber(payload.phoneNumber);

    yield put(okGet(confirmation));
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}