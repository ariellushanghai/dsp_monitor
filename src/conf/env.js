let redirectURL
  , loginURL
  , baseURL
  , redirect_uri = encodeURIComponent(location.origin + '');

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {

  redirectURL = 'http://10.253.6.84:8080/auth?client_id=8a3878f4090f607154b0183f601eb69b&redirect_uri=' + redirect_uri + '';
  loginURL = 'http://10.253.6.84:8080/login';
  baseURL = 'http://localhost:8080/static/mock_json/'
} else {
  redirectURL = 'http://10.253.6.84:8080/auth?client_id=8a3878f4090f607154b0183f601eb69b&redirect_uri=' + redirect_uri + '';
  loginURL = 'http://127.0.0.1:8080/login';
  baseURL = 'http://127.0.0.1:8888'
}

export {redirectURL, loginURL, baseURL}
