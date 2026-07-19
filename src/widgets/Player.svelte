<svelte:options
    customElement={{
        tag: "liiga-player-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { getTeamLogo } from "../utils/teamdata";

    import ruler from "../assets/icons/ruler.svg?raw";
    import weight from "../assets/icons/weight.svg?raw";
    import calendar from "../assets/icons/calendar.svg?raw";
    import flag from "../assets/icons/flag.svg?raw";
    import rink from "../assets/icons/rink.svg?raw";
    import stickL from "../assets/icons/stick-l.svg?raw";
    import stickR from "../assets/icons/stick-r.svg?raw";

    let { playerId = null, theme = "auto", layout = "vertical" } = $props();

    let player = $state(null);
    let latestTeam = $derived.by(() => {
        if (!player || !player.teams) return null;

        const teamKeys = Object.keys(player.teams);
        if (teamKeys.length === 0) return null;

        const latestKey = teamKeys.map((k) => Number(k)).reduce((a, b) => Math.max(a, b));
        return player.teams[latestKey] || player.teams[String(latestKey)] || null;
    });
    onMount(async () => {
        const url = `https://www.liiga.fi/api/v2/players/info/${playerId}`;
        const request = await fetch(url);
        player = await request.json();
    });

    let latestSeasonStats = $derived.by(() => {
        if (!player?.historical) return null;

        const { regular = [], playoffs = [], playout = [] } = player.historical;

        const latestSeason = Math.max(...regular.map((s) => s.season));

        return [...regular, ...playoffs, ...playout]
            .filter((s) => s.season === latestSeason)
            .reduce(
                (acc, stat) => ({
                    season: latestSeason,
                    games: acc.games + stat.games,
                    goals: acc.goals + stat.goals,
                    assists: acc.assists + stat.assists,
                    points: acc.points + stat.points,
                    plusMinus: acc.plusMinus + stat.plusMinus,
                }),
                {
                    season: latestSeason,
                    games: 0,
                    goals: 0,
                    assists: 0,
                    points: 0,
                    plusMinus: 0,
                },
            );
    });

    let careerStats = $derived.by(() => {
        if (!player?.historical) return null;

        const { regular = [], playoffs = [], playout = [] } = player.historical;

        return [...regular, ...playoffs, ...playout].reduce(
            (acc, stat) => ({
                games: acc.games + stat.games,
                goals: acc.goals + stat.goals,
                assists: acc.assists + stat.assists,
                points: acc.points + stat.points,
                plusMinus: acc.plusMinus + stat.plusMinus,
            }),
            {
                games: 0,
                goals: 0,
                assists: 0,
                points: 0,
                plusMinus: 0,
            },
        );
    });

    const statLabels = [
        { key: "games", label: "O", name: "Ottelut" },
        { key: "goals", label: "M", name: "Maalit" },
        { key: "assists", label: "S", name: "Syötöt" },
        { key: "points", label: "P", name: "Pisteet" },
        { key: "plusMinus", label: "+/-", name: "+/-" },
    ];

    function getDate(dateStr) {
        let date = new Date(dateStr);
        return `${String(date.getDate())}.${String(date.getMonth() + 1)}.${date.getFullYear()}`;
    }
</script>

<div class="liiga player widget card {theme} {layout}">
    {#if player != null}
        <div class="image">
            <img class="player-image" src={latestTeam?.imageUrl || ""} alt={`${player.firstName} ${player.lastName}`} />
            <img class="team-logo" src={getTeamLogo(latestTeam.slug)} alt="" />
            <div class="fade"></div>
        </div>

        <section>
            <p class="name">#{latestTeam?.jersey} {player.firstName} {player.lastName}</p>

            <div class="details">
                <div class="info">
                    {@html calendar}
                    <div class="data">
                        <p class="desc">Syntynyt</p>
                        <p class="value">{getDate(player.dateOfBirth)}</p>
                    </div>
                </div>

                <div class="info">
                    {@html flag}
                    <div class="data">
                        <p class="desc">Syntymäpaikka</p>
                        <p class="value">{player.birthLocality.name}, {player.birthLocality.country.code}</p>
                    </div>
                </div>

                <div class="info">
                    {@html flag}
                    <div class="data">
                        <p class="desc">Kansalaisuus</p>
                        <p class="value">{player.nationality.name}, {player.nationality.code}</p>
                    </div>
                </div>

                <div class="info">
                    {@html ruler}
                    <div class="data">
                        <p class="desc">Pituus</p>
                        <p class="value">{player.height} cm</p>
                    </div>
                </div>

                <div class="info">
                    {@html weight}
                    <div class="data">
                        <p class="desc">Paino</p>
                        <p class="value">{player.weight} kg</p>
                    </div>
                </div>
                <div class="info">
                    {@html rink}
                    <div class="data">
                        <p class="desc">Pelipaikka</p>
                        <p class="value">{latestTeam.position}</p>
                    </div>
                </div>

                <div class="info">
                    {#if player.handedness == "R"}
                        {@html stickR}
                    {:else}
                        {@html stickL}
                    {/if}
                    <div class="data">
                        <p class="desc">Kätisyys</p>
                        <p class="value">{player.handedness}</p>
                    </div>
                </div>
            </div>
            {#if latestSeasonStats}
                <div class="stat">
                    <p class="title">{latestSeasonStats.season}</p>
                    {#each statLabels as stat}
                        <div class="data" title={stat.name}>
                            <p class="desc">{stat.label}</p>
                            <p class="value">{latestSeasonStats[stat.key]}</p>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if careerStats}
                <div class="stat">
                    <p class="title">Koko ura</p>
                    {#each statLabels as stat}
                        <div class="data" title={stat.name}>
                            <p class="desc">{stat.label}</p>
                            <p class="value">{careerStats[stat.key]}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
    {:else}
        <p>playerId not set in widget params</p>
    {/if}
</div>

<style lang="scss">
    .liiga.player.widget {
        flex-direction: column;
        overflow: hidden;

        .image {
            position: relative;

            .player-image {
                width: 340px;
                height: 320px;
                object-fit: cover;
                object-position: center top;
                border-radius: 3px;
                z-index: 2;
                position: relative;
                display: block;
            }

            .team-logo {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                opacity: 0.8;
            }
            .fade {
                height: 70px;
                width: 100%;
                background: linear-gradient(0deg, var(--liiga-bg) 20%, transparent 100%);
                z-index: 3;
                position: absolute;
                bottom: 0;
            }
        }

        section {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
        }
        .name {
            font-size: 24px;
            width: 100%;
            text-align: center;
        }

        .details {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            flex-wrap: wrap;
            max-width: 360px;
            background-color: var(--liiga-foreground);
            padding: 10px;
            border-radius: 10px;
            box-sizing: border-box;

            .info {
                display: flex;
                align-items: center;
                gap: 5px;
                :global(svg) {
                    width: 20px;
                    height: 15px;
                }
            }
        }
        .stat {
            display: grid;
            grid-template-columns: 2fr repeat(5, 0.8fr);
            align-items: center;
            gap: 20px;
            background-color: var(--liiga-foreground);
            padding: 5px 10px;
            width: 100%;
            border-radius: 10px;
            box-sizing: border-box;
            .title {
                font-size: 14px;
            }
        }

        .data {
            display: flex;
            flex-direction: column;
            .desc {
                font-size: 11px;
                color: var(--liiga-text-secondary);
            }
            .value {
                font-size: 14px;
            }
        }

        @media (min-width: 768px) {
            &.horizontal {
                flex-direction: row;
                gap: 30px;
                padding-bottom: 0;

                .fade {
                    display: none;
                }

                .player-image {
                    width: 250px;
                }

                .name {
                    text-align: start;
                }
            }
        }
    }
</style>
