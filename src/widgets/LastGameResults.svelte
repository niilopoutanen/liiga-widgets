<svelte:options
    customElement={{
        tag: "liiga-last-game-results-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";

    let data = $state(null);
    let {
        theme = "auto",
        limit = 5,
        team = "jyp"
    } = $props();
</script>

{#if data != null}
    <div class="liiga last-game-results widget card {theme}"></div>
{/if}

<style lang="scss">
    .liiga.last-game-results.widget {
        
    }
</style>
