export function setItem(item, value) {
  if (window) {
    const json = JSON.stringify(value)
    window.localStorage.setItem(item, json)
  }
}

export function getItem(item) {
  if (window) {
    const value = window.localStorage.getItem(item)
    return JSON.parse(value)
  }
}

export function removeItem(item) {
  if (window) {
    window.localStorage.removeItem(item)
  }
}
