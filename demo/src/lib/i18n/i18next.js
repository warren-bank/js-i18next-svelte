import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import {load} from '@warren-bank/i18next-svelte'

import all_languages from '$lib/i18n/langs.json'

// https://www.i18next.com/overview/configuration-options
// https://github.com/i18next/i18next-http-backend/blob/master/README.md#backend-options

const options = {
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    caches: ["localStorage"],
    lookupQuerystring: "lng",
    lookupLocalStorage: "locale",
  },
  fallbackLng: "en",
  supportedLngs: all_languages.map(lng => lng[0]),
  ns: "common",
  backend: {
    crossDomain: true,
    loadPath: "http://localhost:5173/i18n/{{lng}}/{{ns}}.json"
  },
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  }
}

i18next
  .use(HttpBackend)
  .use(LanguageDetector)

load.init(i18next, options)
