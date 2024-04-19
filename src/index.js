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

const verify_init = () => {
  if (!i18next)
    throw new Error('did not call: init(i18next, options, callback)')
}

const init = (_i18next, options, cb) => {
  updateStoreKey(isLoading, 'init', true)
  updateStoreKey(isError,   'init', false)

  i18next = _i18next

  i18next.init(options, function(error, t) {
    updateStoreKey(isError,   'init', !!error)
    updateStoreKey(isLoading, 'init', false)

    i18n.set(i18next)

    if (cb) cb(error, t)
  })
}

const changeLanguage = (lng, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'changeLanguage', true)
  updateStoreKey(isError,   'changeLanguage', false)

  i18next.changeLanguage(lng, function(error, t) {
    updateStoreKey(isError,   'changeLanguage', !!error)
    updateStoreKey(isLoading, 'changeLanguage', false)

    i18n.set(i18next)

    if (cb) cb(error, t)
  })
}

const loadNamespaces = (ns, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'loadNamespaces', true)
  updateStoreKey(isError,   'loadNamespaces', false)

  i18next.loadNamespaces(ns, function(error, t) {
    updateStoreKey(isError,   'loadNamespaces', !!error)
    updateStoreKey(isLoading, 'loadNamespaces', false)

    i18n.set(i18next)

    if (cb) cb(error, t)
  })
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
