import all_languages from "$lib/i18n/langs.json";

export function load({data, url, route, params, setHeaders, fetch, parent, depends}) {
  return {all_languages}
}
