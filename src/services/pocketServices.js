const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000'
const baseUri = 'https://getpocket.com/v3/oauth';
const consumerKey = '78456-3d31f4a129b5a88b18473ccf';

function enableCors(options) {
  const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  return fetch(cors_api_url + options.url, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Accept': 'application/json'
  },
    body: options.data,
  })
}

export function getRequestToken() {
  const options = {
    url: baseUri + '/request',
    method: 'POST',
    data: JSON.stringify({
      'consumer_key': consumerKey,
      'redirect_uri': redirect_uri
    })
  }
  return enableCors(options);
}

export function pocketReroute(request_token, redirect_uri) {
  return `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`
}

export function getPocketAccessToken(code) {
  const options = {
    url: baseUri + '/authorize',
    method: 'POST',
    data: JSON.stringify({
      'consumer_key': consumerKey,
      'code': code
    })
  }
  return enableCors(options);
}