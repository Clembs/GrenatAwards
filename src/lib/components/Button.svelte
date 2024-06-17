<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    href,
    onclick,
    onenter,
    onleave,
    inline,
    variant = 'filled',
    disabled = false,
    children,
  }: {
    href?: string;
    onclick?: () => void;
    onenter?: () => void;
    onleave?: () => void;
    inline?: boolean;
    variant?: 'filled' | 'outlined';
    disabled?: boolean;
    children: Snippet;
  } = $props();
</script>

{#if href}
  <a
    aria-disabled={disabled}
    {href}
    class:inline
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
    type={onclick ? 'button' : 'submit'}
    {disabled}
    class:inline
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
    user-select: none;
    transition: opacity 150ms;

    &[data-variant='filled'] {
      background-color: var(--color-primary);
      border: 1px solid transparent;
    }

    &[data-variant='outlined'] {
      background-color: transparent;
      border: 1px solid var(--color-primary);
      backdrop-filter: blur(20px);
    }

    &.inline {
      display: inline-block;
    }

    &:hover {
      opacity: 0.815;
    }
  }

  button:disabled,
  a[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
