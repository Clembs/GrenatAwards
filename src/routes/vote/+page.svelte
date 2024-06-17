<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/Button.svelte';
  import NomineeCard from '$lib/components/NomineeCard.svelte';
  import type { Nominee } from '$lib/db/types';

  let { data } = $props();
  let selectedNominee = $state<Nominee>();
</script>

<main>
  <form use:enhance method="post">
    <div class="text">
      <div class="title">
        Selon vous, qui est la/le
        <span class="headline">
          {data.category.name} ?
        </span>
      </div>

      <p>
        {data.category.description}
      </p>

      <footer>
        <Button disabled={!selectedNominee}>Confirmer mon vote</Button>

        {data.category.id} vote sur {data.categories.length}
      </footer>
    </div>

    <div class="nominees">
      {#each data.nominees as nominee}
        <NomineeCard onselect={() => (selectedNominee = nominee)} {nominee} />
      {/each}
    </div>
  </form>
</main>

<style lang="scss">
  form {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 1rem;
    padding: 0 4rem;
    height: 100vh;

    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-family: var(--fonts-headings);

        .headline {
          display: block;
          font-size: 3rem;
          font-weight: 600;
          color: var(--color-on-surface-bright);
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
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      padding: 1rem;
      padding-top: 5rem;
      height: 100%;
      overflow-y: auto;

      @media (max-width: 1000px) {
        padding: 0;
        padding-bottom: 100px;
      }
    }

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      padding: 0rem 1.5rem;
      padding-top: 6rem;
    }
  }
</style>
