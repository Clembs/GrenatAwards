<script lang="ts">
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
  const { category } = data;
</script>

<h1>{category.name}</h1>
{#if category.description}
  <p>{category.description}</p>
{/if}
