<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/Button.svelte';
  import NomineeCard from '$lib/components/NomineeCard.svelte';
  import type { Nominee } from '$lib/db/types';

  let { data } = $props();
  let selectedNominee = $state<Nominee | null>();

  let questionParts = $derived.by(() => {
    const parts = data.category.name.split('*');

    if (parts.length > 1) {
      return parts;
    } else {
      return ['', parts[0]];
    }
  });
</script>

<main>
  <form
    use:enhance={() =>
      async ({ update }) => {
        await update({
          reset: true,
          invalidateAll: true,
        });
        selectedNominee = null;
      }}
    method="post"
  >
    <div class="text">
      <div class="title">
        <div inert aria-hidden="true" class="category-number">
          #{data.category.id}
        </div>
        Selon vous, qui {questionParts[0]}
        <span class="headline">
          {questionParts[1]} ?
        </span>
      </div>

      <p>
        {#each data.category.description.split('\n') as paragraph, i}
          {paragraph}
          {#if i !== data.category.description.split('\n').length - 1}
            <br />
          {/if}
        {/each}
      </p>

      <footer>
        <Button disabled={!selectedNominee}>Confirmer mon vote</Button>

        {#if data.category.id === 1}
          {data.category.id} vote
        {:else}
          {data.category.id} votes
        {/if}
        sur {data.categories.length}
      </footer>
    </div>

    {#key data.category.id}
      <div class="nominees">
        {#each data.nominees as nominee}
          {#if nominee.nominee}
            <NomineeCard
              onselect={() => (selectedNominee = nominee.nominee)}
              nominee={nominee.nominee}
            />
          {/if}
        {/each}
      </div>
    {/key}
  </form>
</main>

<style lang="scss">
  form {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 1rem;
    padding: 0 4rem;
    height: 100vh;
    position: fixed;
    inset: 0;

    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-family: var(--fonts-headings);
        position: relative;

        .headline {
          display: block;
          font-size: 3rem;
          line-height: 1.1;
          font-weight: 600;
          color: var(--color-on-surface-bright);
        }

        .category-number {
          position: absolute;
          top: 50%;
          left: -2rem;
          transform: translateY(-50%);
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #6d531f;
          font-size: 10rem;
          z-index: -999;
          color: var(--color-surface);
          font-weight: 600;
        }
      }

      @media (max-width: 1000px) {
        padding-bottom: 1rem;
      }

      footer {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;

        @media (max-width: 1000px) {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          background: var(--color-surface);
          justify-content: center;
        }
      }
    }

    .nominees {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
      padding-top: 5rem;
      height: 100%;
      overflow-y: auto;

      @media (max-width: 1000px) {
        padding: 0;
      }
    }

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      padding: 6rem 1.5rem;
    }
  }
</style>
