<script>
  import Button from '$lib/components/Button.svelte';
</script>

<main>
  <div class="hero">
    <h1>
      Votez pour les <span class="gold-gradiant">meilleurs</span> de Grenat
    </h1>
    <p>
      La célébration ultime de fin d'année des gens du groupe B et d'ailleurs !
      La cérémonie ouvre ce Mercredi en salle Grenat à 14h. Votes réservées aux
      personnes du groupe B.
    </p>
    <Button href="/vote" inline>Je vote</Button>
  </div>
</main>

<style lang="scss">
  main {
    margin: 0 auto;
    max-width: 567px;

    padding-left: 16px;
    padding-right: 16px;

    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    height: 100svh;

    .hero {
      text-align: center;

      h1 {
        font-size: 64px;
        line-height: 70px;
        font-weight: 600;
      }

      p {
        opacity: 0.75;
      }
    }
  }

  .gold-gradiant {
    background: linear-gradient(90deg, #c4a43d 0%, #eecd57 50%, #c4a43d 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
