<svelte:options
    customElement={{
        tag: "liiga-last-game-results-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { fetchJson } from "../utils/api";
    import { getTeamLogo } from "../utils/teamdata";
    import { formatDate, formatTime } from "../utils/parser";

    let data = $state(null);
    let {
        season = 2026,
        tournament = "runkosarja",

        theme = "auto",
        layout = "horizontal",

        limit = 5,
        team = "jyp",
        venue = null,
    } = $props();

    onMount(async () => {
        data = await fetchJson(`/schedule?tournament=${tournament}&season=${season}`);
        console.log($state.snapshot(data));
    });

    let filteredMatches = $derived.by(() => {
        if (!data) return [];

        const now = Date.now();
        const teamSlug = team.toLowerCase();

        return (
            data
                // Only matches already played
                .filter((match) => new Date(match.start).getTime() < now)

                // Team filter
                .filter((match) => {
                    const isHome = match.homeTeamId.endsWith(`:${teamSlug}`);
                    const isAway = match.awayTeamId.endsWith(`:${teamSlug}`);

                    switch (venue) {
                        case "home":
                            return isHome;
                        case "away":
                            return isAway;
                        default:
                            return isHome || isAway;
                    }
                })

                // Newest first
                .sort((a, b) => new Date(b.start) - new Date(a.start))

                // Limit results
                .slice(0, limit)
        );
    });
</script>

{#if data != null}
    <div class="liiga last-game-results widget card {theme} {layout}">
        {#each filteredMatches as match, i}
            <div class="match">
                <img class="logo" src={getTeamLogo(match.homeTeamId)} alt={match.homeTeamName} />
                <div class="details">
                    <p class="date">{formatDate(match.start)} {formatTime(match.start)}</p>
                    <p class="score">{match.homeTeamGoals} - {match.awayTeamGoals}</p>
                </div>
                <img class="logo" src={getTeamLogo(match.awayTeamId)} alt={match.awayTeamName} />
            </div>
            {#if i < filteredMatches.length - 1}
                <div class="separator"></div>
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
    .liiga.last-game-results.widget {
        &.vertical {
            flex-direction: column;

            .separator {
                width: 100%;
                height: 1px;
                background-color: var(--liiga-border);
            }
        }
        &.horizontal {
            flex-direction: row;
            gap: 20px;

            .separator {
                width: 1px;
                min-height: 100%;
                align-self: stretch;
                background-color: var(--liiga-border);
            }
        }
        .match {
            display: flex;
            gap: 10px;
            align-items: center;

            .details {
                display: flex;
                flex-direction: column;
                align-items: center;

                .date {
                    font-size: 14px;
                    color: var(--liiga-text-secondary);
                }
                .score {
                    font-size: 25px;
                }
            }

            .logo {
                width: 50px;
            }
        }
    }
</style>
