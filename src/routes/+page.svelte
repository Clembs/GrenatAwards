<script>
  import Button from '$lib/components/Button.svelte';
</script>

<main>
  <div class="hero">
    <h1>
      Votez pour les<br /> <span class="gold-gradiant">meilleur•es</span> de Grenat
    </h1>
    <p>
      La célébration ultime de fin d'année des gens du groupe B et d'ailleurs !
      <br />
      La cérémonie ouvre ce Mercredi en salle Grenat à 14h.
      <br />
      Votes réservés aux personnes du groupe B.
    </p>
    <Button href="/vote" inline>Je vote</Button>
  </div>
</main>

<style lang="scss">
  main {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 100vh;
    position: fixed;
    inset: 0;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: url('/hero-image.png');
      background-size: cover;
      background-position: center bottom;
      background-repeat: no-repeat;
      z-index: -1;

      @media (max-width: 808px) {
        background-size: 220%;
      }
    }

    .hero {
      transform: translateY(-3rem);
      text-align: center;

      h1 {
        font-size: clamp(3rem, 9vw, 4rem);
        line-height: 1;
        font-weight: 600;
        font-family: var(--fonts-headings);
        text-wrap: balance;
      }

      p {
        max-width: 70ch;
        text-wrap: balance;
      }
    }
  }

  .gold-gradiant {
    background: linear-gradient(90deg, #c4a43d 0%, #eecd57 50%, #c4a43d 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
