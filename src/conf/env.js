let redirectURL
  , loginURL
  , baseURL
  , redirect_uri = encodeURIComponent(location.origin + '');

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
  redirectURL = 'http://localhost:8080/cm/login.html?redirectUrl=' + redirect_uri + '';
  loginURL = 'http://localhost:8080/cm/login.html?redirectUrl=';
  // baseURL = 'http://localhost:8080/static/mock_json/'
  baseURL = 'http://localhost:8080/api/data-manager-svc/v1/dspmonitor'
} else {
  redirectURL = 'http://bip.pab.com.cn/cm/login.html?redirectUrl=' + redirect_uri + '';
  loginURL = 'http://bip.pab.com.cn/cm/login.html?redirectUrl=';
  baseURL = 'http://bip.pab.com.cn/cm/data-manager-svc/v1/dspmonitor'
}

export {redirectURL, loginURL, baseURL}
