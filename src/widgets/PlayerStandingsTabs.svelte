<svelte:options
    customElement={{
        tag: "liiga-player-standings-tabs-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { createSorter } from "../utils/sorter.svelte.js";
    import { fetchJson } from "../utils/api.js";
    import { PLAYER_STAT_COLUMNS } from "../utils/labels.js";
    import { flip } from "svelte/animate";
    import { bounceInOut } from "svelte/easing";

    let {
        season = "2026",
        series = "runkosarja",
        team = null,
        dataType = "basicStats",
        limit = 5,
        columns = "points, goals, assists, games, penaltyMinutes",

        defaultSort = "points",
        theme = "auto",
        showScoreCard = true,
        showAllStats = true,
        link = "none",
    } = $props();

    let players = $state(null);
    const { sort, sortBy, compare } = createSorter("points");

    $effect(() => {
        sort.attribute = defaultSort;
    });

    let sortedPlayers = $derived.by(() => {
        if (!players) return [];

        return [...players].sort(compare).slice(0, limit);
    });

    onMount(async () => {
        players = await fetchJson(`/players/stats/summed/${season}/${season}/${series}/false?team=${team}&dataType=${dataType}&splitTeams=true`);
    });

    const visibleColumns = $derived(
        columns
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
    );

    function getColumnValue(player, column) {
        return player[column] ?? "-";
    }

    function handleClick(playerId) {
        if (link === "none") return;

        if (link === "liiga") {
            const base = "https://www.liiga.fi/fi/pelaajat/";
            window.open(base + playerId, "_blank");
        }
    }
</script>

<div class="liiga player-standings-tabs widget table {theme}">
    <div class="tabs card">
        {#each visibleColumns as column}
            <button onclick={() => (sort.attribute = column)} class:active={sort.attribute === column}>
                {PLAYER_STAT_COLUMNS[column]?.title ?? column}
            </button>
        {/each}
    </div>
    {#if players}
        {#each sortedPlayers as player (player.playerId)}
            <button class="player card" onclick={() => handleClick(player.playerId)} class:clickable={link != "none"} animate:flip={{ duration: 400 }}>
                <div class="player-image">
                    <img src={player.pictureUrl} alt={`${player.firstName} ${player.lastName}}`} />
                </div>
                <div class="details">
                    <p class="name">
                        {#if player.jersey}<span class="number">#{player.jersey}</span>{/if}
                        {player.firstName}
                        {player.lastName}
                    </p>
                    {#if showAllStats}
                        <div class="stats">
                            {#each visibleColumns as column}
                                {#if !(showScoreCard && column === sort.attribute)}
                                    <span class="stat">
                                        <strong>{getColumnValue(player, column)}</strong>
                                        <small>{PLAYER_STAT_COLUMNS[column]?.title ?? column}</small>
                                    </span>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>

                {#if showScoreCard}
                    <div class="score">
                        <p class="value">{getColumnValue(player, sort.attribute)}</p>
                    </div>
                {/if}
            </button>
        {/each}
    {/if}
</div>

<style lang="scss">
    .liiga.player-standings-tabs.widget {
        flex-direction: column;
        background-color: transparent;
        padding: 0;
        .tabs {
            display: flex;
            align-items: start;
            width: 100%;
            gap: 10px;
            box-sizing: border-box;

            button {
                background-color: var(--liiga-foreground);
                outline: none;
                border: none;
                border-radius: 5px;
                padding: 8px 15px;
                font-size: 13px;
                transition: background-color 0.2s ease;

                &.active {
                    background-color: var(--liiga-accent);
                    color: var(--liiga-text-on-accent);
                }
            }
        }

        .player {
            display: flex;
            align-items: center;
            width: 100%;

            background-color: var(--liiga-bg);
            border-radius: 10px;
            box-sizing: border-box;
            overflow: hidden;

            outline: none;
            padding: 0;
        }
        .player-image {
            width: 130px;
            height: 120px;
            margin-right: 20px;

            &:has(img:not([src])) {
                background: var(--liiga-foreground);
                border-radius: 5px;
                margin: 10px;
                height: 100px;
                margin-right: 20px;
                width: 120px;
            }
            img {
                width: 100%;
                height: 140%;
                object-fit: cover;
                object-position: center top;

                &:not([src]) {
                    display: none;
                }
            }
        }

        .details {
            flex-grow: 1;
            margin-right: 30px;

            .name {
                font-size: 20px;
                font-weight: 500;
                display: flex;
                flex-direction: column;
                align-items: start;
                margin: 0;

                .number {
                    color: var(--liiga-text-secondary);
                    font-weight: 400;
                    font-size: 15px;
                }
            }
            .stats {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-top: 6px;

                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: start;

                    small {
                        font-size: 11px;
                        opacity: 0.7;
                        text-transform: capitalize;
                    }
                }
            }
        }
        .score {
            height: 120px;
            width: 100px;
            background-color: var(--liiga-accent);
            color: var(--liiga-text-on-accent);

            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 25px;
        }
    }
</style>
