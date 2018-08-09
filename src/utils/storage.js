export function setToLocal (id, key, value) {
  let seller = window.localStorage._seller
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage._seller = JSON.stringify(seller)
}

export function getFromLocal (id, key, def) {
  let seller = window.localStorage._seller
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  if (!seller[key]) {
    return def
  } else {
    console.log(seller[key])
    return seller[key]
  }
}
