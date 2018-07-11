const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000'
const baseAuthUri = 'https://getpocket.com/v3/oauth';
const consumerKey = '78456-3d31f4a129b5a88b18473ccf';
const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const tag = 'daugherty';
const detailType = 'complete';


function enableCorsGet(options) {
  return fetch(cors_api_url + options.url, {
    method: options.method,
  })
}

function enableCorsPost(options) {
  return fetch(cors_api_url + options.url, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Accept': 'application/json',
  },
    body: options.data,
  })  
}

export function getRequestToken() {
  const options = {
    url: baseAuthUri + '/request',
    method: 'POST',
    data: JSON.stringify({
      'consumer_key': consumerKey,
      'redirect_uri': redirect_uri
    })
  }
  return enableCorsPost(options);
}

export function pocketReroute(request_token, redirect_uri) {
  return `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`
}

export function getPocketAccessToken(code) {
  const options = {
    url: baseAuthUri + '/authorize',
    method: 'POST',
    data: JSON.stringify({
      'consumer_key': consumerKey,
      'code': code
    })
  }
  return enableCorsPost(options);
}

export function getPocketLinks(accessToken) {
  const options = {
    url: `https://getpocket.com/v3/get?consumer_key=${consumerKey}&access_token=${accessToken}&tag=${tag}&detailType=${detailType}`,
    method: 'GET'
  }
  return enableCorsGet(options);
}