import to from 'await-to-js';
import apartamentServices from '../../services/apartament';
import apartamentConstants from '../constants/apartament';

const sendCreds = data => {
  const request = () => {
    return {
      type: apartamentConstants.SEND_DATA_REQUEST,
    }
  };
  const success = payload => {
    return {
      type: apartamentConstants.SEND_DATA_SUCCESS,
      payload,
    };
  };
  const failure = err => {
    return {
      type: apartamentConstants.SEND_DATA_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    const [err, respData] = await to(apartamentServices(data));
    console.log(respData);
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(respData));
    return respData;
  };
};

export default {
  sendCreds,
};
