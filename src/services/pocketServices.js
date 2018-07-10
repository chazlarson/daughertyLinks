const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000'

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
    url: 'https://getpocket.com/v3/oauth/request',
    method: 'POST',
    data: JSON.stringify({
      'consumer_key':'78456-3d31f4a129b5a88b18473ccf',
      'redirect_uri': redirect_uri
    })
  }
  return enableCors(options);
}

export function pocketReroute(request_token) {
  return `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`
}

export function getPocketAccessToken(consumer_key, ) {
  
}

// const fetchPocketService = () {

// }