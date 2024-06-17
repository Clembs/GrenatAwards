<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    href,
    onclick,
    onenter,
    onleave,
    variant = 'filled',
    children,
  }: {
    href?: string;
    onclick?: () => void;
    onenter?: () => void;
    onleave?: () => void;
    variant?: 'filled' | 'outlined';
    children: Snippet;
  } = $props();
</script>

{#if href}
  <a
    {href}
    data-variant={variant}
    onmouseover={onenter}
    onmouseleave={onleave}
    onfocus={onenter}
    onblur={onleave}
  >
    {@render children()}
  </a>
{:else}
  <button
    data-variant={variant}
    {onclick}
    onmouseover={onenter}
    onmouseleave={onleave}
    onfocus={onenter}
    onblur={onleave}
  >
    {@render children()}
  </button>
{/if}

<style lang="scss">
  button,
  a {
    display: block;
    color: var(--color-on-surface-bright);
    border-radius: 9rem;
    padding: 0.5rem 0.75rem;

    &[data-variant='filled'] {
      background-color: var(--color-primary);
      border: 1px solid transparent;
    }

    &[data-variant='outlined'] {
      background-color: transparent;
      border: 1px solid var(--color-primary);
    }
  }
</style>
