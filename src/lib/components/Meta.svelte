<script lang="ts">
  interface Props {
    title: string;
    description: string;

    image: string;
  }

  const { title, description, image }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={title} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="624" />
  <meta property="og:image:alt" content={title} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>
