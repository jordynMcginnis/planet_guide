export function getId(url) {
  return url.match(/\d+/)[0]
}

export function dateFormatter(date) {
  return new Date(date)
}
