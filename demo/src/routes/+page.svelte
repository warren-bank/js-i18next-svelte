<script>
  import {Heading} from 'flowbite-svelte'
  import i18n from '@warren-bank/i18next-svelte'
</script>

<section class="m-4">
  <Heading tag="h1">{$i18n.t("Hello")}</Heading>
  <Heading tag="h2">{$i18n.t("World")}</Heading>
</section>
