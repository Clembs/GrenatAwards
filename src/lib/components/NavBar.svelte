<script>
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Logo from '$lib/Logo.svelte';
</script>

<nav>
  <a href="/">
    <Logo />
    <span class="large-only"> Grenat Awards </span>
  </a>

  {#if $page.data.user}
    <Button variant="outlined">
      <span class="large-only"> Connecté•e en tant que </span>
      @{$page.data.user.username}
    </Button>
  {:else}
    <Button href="/vote">Se connecter</Button>
  {/if}
</nav>

<style lang="scss">
  nav {
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(to bottom, var(--color-surface), transparent);
    // backdrop-filter: blur(10px);

    a {
      display: flex;
      align-items: center;
      font-family: var(--fonts-headings);
      font-size: 1.25rem;
      gap: 0.5rem;
      font-weight: 500;
      color: var(--color-on-surface-bright);
    }

    @media (max-width: 550px) {
      .large-only {
        display: none;
      }
    }
  }
</style>
