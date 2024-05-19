### [_i18next-svelte_](https://github.com/warren-bank/js-i18next-svelte)

[Svelte](https://github.com/sveltejs/svelte) wrapper for [i18next](https://github.com/i18next/i18next).

### Summary

* ES module
* export:
  ```javascript
    {
      i18n as default,
      i18n,
      load,
      isLoading,
      isError
    }
  ```
* where:
  - `i18n`
    * is a store that holds an initialized instance of [i18next](https://github.com/i18next/i18next)
  - `isLoading`
    * is a store that holds an object:<br>`{init, changeLanguage, loadLanguages, loadNamespaces, loadResources, reloadResources}`
    * each object key stores a _boolean_
    * each _boolean_ indicates whether or not the corresponding `load` method is currently running
  - `isError`
    * is a store that holds an object:<br>`{init, changeLanguage, loadLanguages, loadNamespaces, loadResources, reloadResources}`
    * each object key stores a _boolean_
    * each _boolean_ indicates whether or not the corresponding `load` method has completed running with an error
  - `load`
    * is __not__ a store
    * is an object:<br>`{init, changeLanguage, loadLanguages, loadNamespaces, loadResources, reloadResources}`
    * each object key stores a _function_
    * each _function_ is a wrapper around a method that would normally be called on an initialized instance of [i18next](https://github.com/i18next/i18next)
      - the return value is unchanged
    * each wrapper should be used instead
      - it delegates the call to the initialized instance of [i18next](https://github.com/i18next/i18next) held by the store: `i18n`
      - it manages the state of stores: `isLoading` and `isError`
      - completion of the operation updates the store: `i18n`

### Install

```bash
  npm install --save "@warren-bank/i18next-svelte"
```

### Usage

#### initialization:

* performed once
  - for example: in the [root layout](https://kit.svelte.dev/docs/routing#layout-layout-svelte) of a [SvelteKit](https://github.com/sveltejs/kit) project

* short demo
  ```javascript
    import i18next from 'i18next'
    import {load} from '@warren-bank/i18next-svelte'

    const options = {}

    i18next
      .use(...)
      .use(...)

    load.init(i18next, options)
  ```

* [full demo](./demo/src/lib/i18n/i18next.js)

#### translation:

* performed many
  - for example: on every page

* short demo
  ```html
    <script>
      import i18n from '@warren-bank/i18next-svelte'
    </script>

    <h1>{$i18n.t('my.key')}</h1>
  ```

* [full demo](./demo/src/routes/+page.svelte)

### Full Demo

```bash
  cd demo
  npm install
  npm run dev

  # open URL: http://localhost:5173/
```

### Legal

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
