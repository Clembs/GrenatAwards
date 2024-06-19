<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import supabase from '$lib/supabase';
  import { onMount } from 'svelte';

  let { data } = $props();

  let currentCategory = $state(1);
  const votingChannel = supabase.channel('voting');

  onMount(() => {
    votingChannel.subscribe((status) => {
      // Wait for successful connection
      if (status !== 'SUBSCRIBED') {
        return null;
      }
    });
  });

  const startVoting = () => {
    votingChannel.send({
      type: 'broadcast',
      event: 'start',
      payload: {
        category: currentCategory,
      },
    });
  };
  const showResults = () => {
    votingChannel.send({
      type: 'broadcast',
      event: 'results',
    });
  };
  const nextCategory = () => {
    votingChannel.send({
      type: 'broadcast',
      event: 'next',
    });
  };

  // Listen for incoming votes
  votingChannel.on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
    },
    (payload) => {
      console.log('Received payload:', payload.new);
    },
  );

  let category = $derived(
    data.categories.find((c) => c.id === currentCategory)!,
  );
</script>

<main>
  <h1>{category.name}</h1>
  <p>{category.description}</p>

  <div class="actions">
    <Button onclick={startVoting}>Démarrer le vote</Button>
    <Button variant="outlined" onclick={showResults}>
      Afficher les résultats
    </Button>
    <Button variant="outlined" onclick={nextCategory}>
      Passer à la catégorie suivante
    </Button>
  </div>
</main>

<style lang="scss">
  main {
    margin: 0 auto;
    padding: 1rem 1.5rem;
    max-width: 800px;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
</style>
