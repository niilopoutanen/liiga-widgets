<svelte:options
    customElement={{
        tag: "liiga-player-standings-list-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { createSorter } from "../utils/sorter.svelte.js";
    import { fetchJson } from "../utils/api.js";
    import { PLAYER_STAT_COLUMNS } from "../utils/labels.js";

    let {
        season = "2026",
        series = "runkosarja",
        team = null,
        dataType = "basicStats",
        limit = 100,
        columns = "games, goals, assists, points, penaltyMinutes",

        defaultSort = "points",
        showImages = false,
        theme = "auto",
        highlightPlayer = null,
        link = "none"
    } = $props();

    let players = $state(null);
    const { sort, sortBy, compare } = createSorter("points");

    $effect(() => {
        sort.attribute = defaultSort;
    });

    let sortedPlayers = $derived.by(() => {
        if (!players) return [];

        return [...players].sort(compare);
    });

    const visibleColumns = $derived(
        columns
            .split(",")
            .map((c) => c.trim())
            .filter((c) => PLAYER_STAT_COLUMNS[c]),
    );

    onMount(async () => {
        players = await fetchJson(`/players/stats/summed/${season}/${season}/${series}/false?team=${team}&dataType=${dataType}&splitTeams=true`);
    });

    function handleClick(playerId) {
        if (link === "none") return;

        if (link === "liiga") {
            const base = "https://www.liiga.fi/fi/pelaajat/";
            window.open(base + playerId, "_blank");
        }
    }
</script>

<div class="liiga player-standings-list widget table {theme}">
    {#if players}
        <table class="card">
            <thead>
                <tr>
                    <th>Sija</th>
                    <th class="left">Nimi</th>
                    <th class="left">Seura</th>

                    {#each visibleColumns as column}
                        <th title={PLAYER_STAT_COLUMNS[column].title} onclick={() => sortBy(column)} class:active={sort.attribute === column}>
                            {PLAYER_STAT_COLUMNS[column].label}
                        </th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each sortedPlayers as player, i (i)}
                    {#if limit === 0 || i < limit}
                        <tr class="player" class:highlight={player.playerId == highlightPlayer} onclick={() => handleClick(player.playerId)} class:clickable={link != "none"}>
                            <td>{i + 1}.</td>
                            {#if showImages}
                                <td class="left flex">
                                    <img class="player-image" src={player.pictureUrl} alt={`${player.firstName} ${player.lastName}`} />
                                    <span>{player.firstName} {player.lastName}</span>
                                </td>
                            {:else}
                                <td class="left">{player.firstName} {player.lastName}</td>
                            {/if}
                            <td class="left">{player.teamName}</td>

                            {#each visibleColumns as column}
                                <td>{player[column]}</td>
                            {/each}
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    {/if}
</div>

<style lang="scss">
    .liiga.player-standings-list.widget {
        .player-image {
            width: 50px;
            height: 30px;
            object-fit: cover;
            object-position: center top;
        }
    }
</style>
