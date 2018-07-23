export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const pathInfo = {
  host: window && window.location && window.location.hostname,
  protocol: window && window.location && window.location.protocol,
  port: window && window.location && window.location.port,
  path: window && window.location && window.location.pathname,
  domainPath: ()=> `${pathInfo.protocol}//${pathInfo.host}${pathInfo.port !== "80" ? `:${pathInfo.port}`: ''}`
}