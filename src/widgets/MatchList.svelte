<svelte:options
    customElement={{
        tag: "liiga-match-list-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { getTeamLogo, parseId, getTeamColor } from "../utils/teamdata";

    let matches = $state(null);
    let {
        season = 2027,
        tournament = "runkosarja",
        team = null,
        venue = null,
        separateMonths = true,
        ticketButton = true,
        limit = 0,
        gradient = false,

        theme = "auto",
    } = $props();

    onMount(async () => {
        const url = `https://www.liiga.fi/api/v2/schedule?tournament=${tournament}&season=${season}`;
        const request = await fetch(url);
        matches = await request.json();
        console.log($state.snapshot(matches));
    });

    let filteredMatches = $derived.by(() => {
        if (!matches) return [];

        const filtered = matches.filter((match) => {
            if (!team) return true;

            const home = parseId(match.homeTeamId);
            const away = parseId(match.awayTeamId);

            switch (venue) {
                case "home":
                    return home === team;

                case "away":
                    return away === team;

                default:
                    return home === team || away === team;
            }
        });

        if (limit > 0) {
            return filtered.slice(0, limit);
        }

        return filtered;
    });

    function getDate(dateStr) {
        let date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
    }

    function getTime(dateStr) {
        let date = new Date(dateStr);
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }

    const months = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];

    let groupedMatches = $derived.by(() => {
        if (!separateMonths) {
            return [
                {
                    month: null,
                    matches: filteredMatches,
                },
            ];
        }

        const groups = [];

        for (const match of filteredMatches) {
            const date = new Date(match.start);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            const label = `${months[date.getMonth()]} ${date.getFullYear()}`;

            let group = groups.at(-1);

            if (!group || group.key !== key) {
                group = {
                    key,
                    month: label,
                    matches: [],
                };
                groups.push(group);
            }

            group.matches.push(match);
        }

        return groups;
    });

    function getBackground(game) {
        const home = getTeamColor(game.homeTeamId);
        const away = getTeamColor(game.awayTeamId);

        return `
        linear-gradient(
            90deg,
            transparent 0%,
            ${home}22 30%,
            ${away}22 70%,
            transparent 100%
        )`;
    }
</script>

<div class="liiga match-list widget {theme}" class:separateMonths class:ticketButton>
    {#if matches != null}
        {#each groupedMatches as group}
            {#if group.month}
                <div class="month">{group.month}</div>
            {/if}

            <div class="matches card">
                {#each group.matches as match (match.id)}
                    <div class="match">
                        <p class="date">{getDate(match.start)}</p>
                        <p class="home name">{match.homeTeamName}</p>
                        <img class="logo" src={getTeamLogo(match.homeTeamId)} alt={match.homeTeamName} />
                        <p class="time">{getTime(match.start)}</p>
                        <img class="logo" src={getTeamLogo(match.awayTeamId)} alt={match.awayTeamName} />
                        <p class="away name">{match.awayTeamName}</p>

                        {#if ticketButton && match.buyTicketsUrl != null}
                            <a class="tickets" href={match.buyTicketsUrl} target="_blank">Osta liput</a>
                        {/if}

                        {#if gradient}
                            <div class="gradient" style={match ? `background: ${getBackground(match)}` : ""}></div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    .liiga.match-list.widget {
        flex-direction: column;
        padding: 0;

        .matches {
            border-radius: 10px;
            overflow: hidden;
            padding: 0;

            .match {
                display: grid;
                grid-template-columns: 80px minmax(140px, 1fr) 40px 60px 40px minmax(140px, 1fr);
                width: 100%;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
                gap: 10px;
                position: relative;

                .date {
                    justify-self: start;
                }
                .time {
                    justify-self: center;
                }
                .logo {
                    width: 40px;
                    height: 40px;
                    justify-self: center;
                }

                &:nth-child(even) {
                    background: var(--liiga-foreground);
                }

                .home.name {
                    justify-self: end;
                }
                .away.name {
                    justify-self: start;
                }

                .date,
                .time,
                .logo,
                .name,
                .tickets {
                    z-index: 2;
                }

                .gradient {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
            }
        }
        &.separateMonths {
            background-color: transparent;
            .matches {
                background-color: var(--liiga-bg);
            }

            .month {
                display: flex;
                width: 100%;
                margin-top: 10px;
            }
        }

        &.ticketButton {
            .match {
                grid-template-columns: 80px minmax(140px, 1fr) 40px 60px 40px minmax(140px, 1fr) 100px;
            }

            .tickets {
                color: var(--liiga-text);
                text-decoration: none;
                cursor: pointer;
                text-align: end;
            }
        }
    }
</style>
