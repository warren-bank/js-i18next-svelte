import {writable} from 'svelte/store'

let   i18next = null
const i18n    = writable(null)

const isLoading = writable({
  init:           false,
  changeLanguage: false,
  loadNamespaces: false
})

const isError = writable({
  init:           false,
  changeLanguage: false,
  loadNamespaces: false
})

const updateStoreKey = (store, key, val) => {
  store.update(obj => {
    obj[key] = val
    return obj
  })
}

const genericCallback = (storeKey, userCallback, error, ...args) => {
  updateStoreKey(isError,   storeKey, !!error)
  updateStoreKey(isLoading, storeKey, false)

  i18n.set(i18next)

  if (userCallback && (typeof userCallback === 'function'))
    userCallback(error, ...args)
}

const verify_init = () => {
  if (!i18next)
    throw new Error('did not call: init(i18next, options, callback)')
}

const init = (_i18next, options, cb) => {
  updateStoreKey(isLoading, 'init', true)
  updateStoreKey(isError,   'init', false)

  i18next = _i18next

  return i18next.init(options, genericCallback.bind(null, 'init', cb))
}

const changeLanguage = (lng, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'changeLanguage', true)
  updateStoreKey(isError,   'changeLanguage', false)

  return i18next.changeLanguage(lng, genericCallback.bind(null, 'changeLanguage', cb))
}

const loadNamespaces = (ns, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'loadNamespaces', true)
  updateStoreKey(isError,   'loadNamespaces', false)

  return i18next.loadNamespaces(ns, genericCallback.bind(null, 'loadNamespaces', cb))
}

const load = {
  init,
  changeLanguage,
  loadNamespaces
}

export {
  i18n as default,
  i18n,
  load,
  isLoading,
  isError
}
