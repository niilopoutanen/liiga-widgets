<svelte:options
    customElement={{
        tag: "liiga-match-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { getTeamLogo, getTeamColor } from "../utils/teamdata";
    import { fetchJson } from "../utils/api.js";
    import { formatDate, formatTime } from "../utils/parser.js";

    let data = $state(null);
    let { matchId = 2701274, season = 2027, theme = "auto", gradient = true } = $props();

    onMount(async () => {
        data = await fetchJson(`/games/${season}/${matchId}`);
    });

    function getBackground(game) {
        const home = getTeamColor(game.homeTeam.teamId);
        const away = getTeamColor(game.awayTeam.teamId);

        return `
        linear-gradient(
            90deg,
            ${home}22 0%,
            transparent 30%,
            transparent 70%,
            ${away}22 100%
        )`;
    }
</script>

<div class="liiga match widget card {theme}">
    {#if data != null}
        <div class="home">
            <img class="logo" src={getTeamLogo(data.game.homeTeam.teamId)} alt={data.game.homeTeam.teamName} />
        </div>
        {#if data.game.ended}
            <div class="score">
                <p class="goals">{data.game.homeTeam.goals} - {data.game.awayTeam.goals}</p>
                <p class="details">
                    {#each data.game.periods.filter((period) => period.homeTeamGoals !== 0 || period.awayTeamGoals !== 0) as period, index}
                        {period.homeTeamGoals} - {period.awayTeamGoals}
                        {#if index < data.game.periods.filter((period) => period.homeTeamGoals !== 0 || period.awayTeamGoals !== 0).length - 1}
                            ,
                        {/if}
                    {/each}
                </p>
            </div>
        {:else}
            <div class="date">
                <p class="hours">{formatDate(data.game.start)}</p>
                <p class="minutes">{formatTime(data.game.start)}</p>
            </div>
        {/if}
        <div class="away">
            <img class="logo" src={getTeamLogo(data.game.awayTeam.teamId)} alt={data.game.awayTeam.teamName} />
        </div>

        {#if gradient}
            <div class="gradient" style={data ? `background: ${getBackground(data.game)}` : ""}></div>
        {/if}
    {/if}
</div>

<style lang="scss">
    .liiga.match.widget {
        overflow: hidden;
        p {
            margin: 0;
        }
        .logo {
            width: 50px;
            height: 50px;
        }

        .home,
        .away{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .date {
            display: flex;
            flex-direction: column;
            align-items: center;
            .hours {
                font-size: 20px;
                font-weight: bold;
            }
            .minutes {
                font-weight: 400;
            }
        }
        .score {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .goals {
                font-size: 1.5rem;
                font-weight: bold;
            }

            .details {
                font-size: 0.8rem;
                color: var(--liiga-text-secondary);
            }
        }

        .gradient {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
</style>
