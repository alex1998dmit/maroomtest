import apartamentConstants from '../constants/apartament';

const initState = {
  isLoading: false,
  err: null,
  data: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case apartamentConstants.SEND_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case apartamentConstants.SEND_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        err: null,
        data: action.payload,
      };
    case apartamentConstants.SEND_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};