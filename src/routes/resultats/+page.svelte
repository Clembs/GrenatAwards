<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { categories } from '$lib/db/schema';

  let { data } = $props();
</script>

<main>
  <h1>Résultats</h1>

  <p>
    Les résultats seront dévoilés lors de la cérémonie des Grenat Awards 2024 :
    <br />
    Mercredi 19 juin à 14:00 - 15:00
    <br />
    Salle Grenat
  </p>

  <h2>Vos votes</h2>

  <p>Note : vos votes sont anonymes et définitifs.</p>

  <ul id="votes">
    {#each data.userVotes as vote}
      {@const parts = vote.category.name.split('*')}
      {@const otherVotes = data.votes.filter(
        (v) => v.category.id === vote.category.id,
      )}
      {@const sameVotes = otherVotes.filter(
        (v) => v.nominee.id === vote.nominee.id,
      )}
      <li class="vote">
        <img
          height="56"
          width="56"
          src={vote.nominee.imageUrl || '/placeholder.svg'}
          alt={vote.nominee.name}
        />
        <div class="text">
          <div class="category-name" aria-label="Catégorie :">
            <img src="/trophy.png" alt="Icône du trophée" />
            {parts[1] || parts[0]}
          </div>
          <div class="nominee-name">
            Vous avez voté <b>{vote.nominee.name}</b>.comme {sameVotes.length}
            votant(s) ({(sameVotes.length / otherVotes.length) * 100}%)
          </div>
        </div>
      </li>
    {/each}
  </ul>

  {#if data.userVotes.length === 0}
    <div class="alert">
      Vous n'avez pas encore voté !

      <Button inline href="/vote">Voter</Button>
    </div>
  {:else if data.userVotes.length !== data.categories.length}
    <div class="alert">
      Vous n'avez pas encore voté pour toutes les catégories !
      <Button inline href="/vote">Continuer à voter</Button>
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    margin: 0 auto;
    padding: 1rem 1.5rem;
    max-width: 800px;

    #votes {
      margin: 1rem 0;
      .vote {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 0.5rem;

        .category-name {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          font-weight: 500;
          font-size: 1.125rem;
          color: var(--color-on-surface-bright);

          img {
            height: 20px;
            width: auto;
          }
        }
      }
    }

    .alert {
      background-color: var(--color-on-surface);
      color: var(--color-surface);
      padding: 1rem;
      border-radius: 1rem;
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      font-weight: bold;
      align-items: center;

      @media (max-width: 710px) {
        flex-direction: column;
        text-align: center;
        align-items: initial;
      }
    }
  }
</style>
