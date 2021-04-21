import axios from 'axios';

export const Api = async (endpoint, method, data = null) => {
  let token = '';
  let baseurl = 'http://18.219.190.99:3100/api/';
  let url = baseurl + endpoint;
  let header = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  console.log('token--', token);

  header = (token === '' && header) || Object.assign(header, {token: token});
  switch (method) {
    case 'get':
      return axios
        .get(url, {headers: header})
        .then(res => {
          if (res.status === 200) {
            if (
              res.data.errCode &&
              res.data.errCode === 401 &&
              endpoint !== 'userActions/getUserProfile'
            ) {
              return setUnauthorizedUser(res.data.errMessage);
            } else if (endpoint === 'userActions/getUserProfile') {
              if (res.data.errCode && res.data.errCode === 401) {
                return false;
              } else {
                return res;
              }
            } else {
              return res;
            }
          } else {
            return res;
          }
        })
        .catch(err => {
          // alert('Oops! May be Server Issue');
          return err;
        });
    case 'post':
      return axios
        .post(url, data, {headers: header})
        .then(res => {
          if (res.status === 200) {
            return res;
          } else {
            // alert(res.data.data);
            return res;
          }
        })
        .catch(err => {
          // alert('Oops! May be Server Issue');
          return err;
        });
  }
};
