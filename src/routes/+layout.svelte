<script lang="ts">
  import NavBar from '$lib/components/NavBar.svelte';
  import '../styles/global.scss';

  let { children } = $props();
</script>

<NavBar />

{@render children()}
