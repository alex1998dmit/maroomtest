import axios from 'axios'
import to from 'await-to-js';

const host = `https://api.dev.maroom.ru/api/v1`;

const sendTestParams = async params => {
  const [err, resp] = await to(axios.get(`${host}/calculate_payments`, { params }));
  if (err) {
    throw err;
  }
  return resp.data;
};

export default sendTestParams;
