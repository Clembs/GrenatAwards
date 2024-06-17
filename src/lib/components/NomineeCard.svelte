<script lang="ts">
  import type { Nominee } from '$lib/db/types';

  let {
    nominee,
    onselect,
  }: {
    nominee: Nominee;
    onselect?: (nominee: Nominee) => void;
  } = $props();
</script>

<div class="nominee-card">
  <input
    type="radio"
    id="nominee-{nominee.id}"
    aria-label="Voter pour {nominee.name}"
    name="nominee"
    onchange={() => onselect?.(nominee)}
    value={nominee.id}
  />
  <label for="nominee-{nominee.id}">
    <img
      height="250"
      width="250"
      src={nominee.imageUrl || 'https://m.clembs.com/placeholder-image.png'}
      alt={nominee.name}
      id="img-{nominee.id}"
      aria-labelledby="label-{nominee.id}"
    />
    <span id="label-{nominee.id}" aria-describedby="img-{nominee.id}">
      {nominee.name}
    </span>
  </label>
</div>

<style lang="scss">
  .nominee-card {
    input {
      display: none;

      &:checked + label {
        color: var(--color-primary);
        font-variation-settings: 'wght' 700;

        img {
          border: 3px solid var(--color-primary);
        }
      }
    }

    label {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: var(--color-on-surface);
      width: 100%;
      font-variation-settings: 'wght' 400;
      transition: font-variation-settings 150ms;

      img {
        border: 1px solid var(--color-on-surface);
        width: 100%;
        height: auto;
        transition: border 300ms;
      }

      span {
        word-break: break-all;
      }
    }
  }
</style>
