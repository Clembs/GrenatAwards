<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import '../styles/global.scss';

  let { children } = $props();
</script>

<Meta
  title="Grenat Awards - Votez pour les meilleur•es de Grenat"
  description="La célébration ultime de fin d'année des gens du groupe B et d'ailleurs !"
  image="/hero-image.png"
/>

<NavBar />

{@render children()}
