<script>
  export let data

  import {i18n, load, isLoading, isError} from '@warren-bank/i18next-svelte'

  import '$lib/style/app.css'
  import '$lib/i18n/i18next.js'

  import {DarkMode, Select} from 'flowbite-svelte'

  let lang = null

  $: if (!lang && $i18n && !$isLoading.init) lang = $i18n.language

  $: if (lang && $i18n && !$isLoading.init && (lang !== $i18n.language)) load.changeLanguage(lang);
</script>

<svelte:head>
  {#if !$isLoading.init && !$isError.init}
    <title>{$i18n.t('Hello')}, {$i18n.t('World')}!</title>
  {/if}
</svelte:head>

{#if $isLoading.init}
  <h1>Loading&hellip;</h1>
{:else if $isError.init}
  <h1>Error!</h1>
{:else}
  <div class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2.5 fixed right-4 top-2 z-50">
    <Select class="text-sm focus:outline-none inline w-fit max-w-fit mr-2.5" items={data.all_languages.map(lang => ({value: lang[0], name: lang[1]}))} bind:value={lang} />
    <DarkMode />
  </div>

  <slot />
{/if}
