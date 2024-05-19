import {writable} from 'svelte/store'

let   i18next = null
const i18n    = writable(null)

const isLoading = writable({
  init:            false,
  changeLanguage:  false,
  loadLanguages:   false,
  loadNamespaces:  false,
  loadResources:   false,
  reloadResources: false
})

const isError = writable({
  init:            false,
  changeLanguage:  false,
  loadLanguages:   false,
  loadNamespaces:  false,
  loadResources:   false,
  reloadResources: false
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

// return: Promise
const init = (_i18next, options, cb) => {
  updateStoreKey(isLoading, 'init', true)
  updateStoreKey(isError,   'init', false)

  i18next = _i18next

  return i18next.init(options, genericCallback.bind(null, 'init', cb))
}

// return: Promise
const changeLanguage = (lng, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'changeLanguage', true)
  updateStoreKey(isError,   'changeLanguage', false)

  return i18next.changeLanguage(lng, genericCallback.bind(null, 'changeLanguage', cb))
}

// return: Promise
const loadLanguages = (lngs, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'loadLanguages', true)
  updateStoreKey(isError,   'loadLanguages', false)

  return i18next.loadLanguages(lngs, genericCallback.bind(null, 'loadLanguages', cb))
}

// return: Promise
const loadNamespaces = (ns, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'loadNamespaces', true)
  updateStoreKey(isError,   'loadNamespaces', false)

  return i18next.loadNamespaces(ns, genericCallback.bind(null, 'loadNamespaces', cb))
}

// return: undefined
const loadResources = (language, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'loadResources', true)
  updateStoreKey(isError,   'loadResources', false)

  return i18next.loadResources(language, genericCallback.bind(null, 'loadResources', cb))
}

// return: Promise
const reloadResources = (lngs, ns, cb) => {
  verify_init()

  updateStoreKey(isLoading, 'reloadResources', true)
  updateStoreKey(isError,   'reloadResources', false)

  return i18next.reloadResources(lngs, ns, genericCallback.bind(null, 'reloadResources', cb))
}

const load = {
  init,
  changeLanguage,
  loadLanguages,
  loadNamespaces,
  loadResources,
  reloadResources
}

export {
  i18n as default,
  i18n,
  load,
  isLoading,
  isError
}
