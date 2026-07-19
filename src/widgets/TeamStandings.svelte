<svelte:options
    customElement={{
        tag: "liiga-team-standings-widget",
        shadow: "none",
    }}
/>

<script>
    import { onMount } from "svelte";
    import "../global.scss";
    import { createSorter } from "../utils/sorter.svelte.js";
    import { teams } from "../utils/teamdata.js";
    import { getTeamLogo } from "../utils/teamdata.js";

    let { season = "2026", theme = "auto", highlightTeam = "jyp", link = "none" } = $props();
    let data = $state(null);

    const { sort, sortBy, compare } = createSorter("points");
    let sortedTeams = $derived.by(() => {
        if (!data) return [];
        return [...data.season].sort(compare);
    });

    onMount(async () => {
        const url = `https://www.liiga.fi/api/v2/standings/?season=${season}`;
        const request = await fetch(url);
        data = await request.json();
    });

    function needsHighlight(rawId) {
        const parts = rawId.split(":");
        if (parts.length < 1) return false;

        const lastPart = parts[1];
        return lastPart === highlightTeam;
    }

    function handleClick(teamId) {
        if (link === "none") return;

        const parts = teamId.split(":");
        if (parts.length < 1) return false;
        const lastPart = parts[1];

        if (link === "homepage") {
            const url = teams.find((team) => team.id === lastPart)?.homepage;
            console.log(url);
            if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
            }
        }

        if (link === "liiga") {
            const base = "https://www.liiga.fi/fi/joukkueet/";
            const urlsafe = lastPart.replaceAll("ä", "a").replaceAll("ö", "o");
            window.open(base + urlsafe, "_blank", "noopener,noreferrer");
        }
    }
</script>

<div class="liiga team-standings widget table {theme}">
    {#if data != null}
        <table class="card">
            <thead>
                <tr>
                    <th class="left"></th>
                    <th class="clickable" title="Ottelut" onclick={() => sortBy("games")} class:active={sort.attribute === "games"}> O </th>
                    <th class="clickable" title="Voitot" onclick={() => sortBy("wins")} class:active={sort.attribute === "wins"}> V </th>
                    <th class="clickable" title="Tasapelit" onclick={() => sortBy("ties")} class:active={sort.attribute === "ties"}> T </th>
                    <th class="clickable" title="Häviöt" onclick={() => sortBy("losses")} class:active={sort.attribute === "losses"}> H </th>
                    <th class="clickable" title="Pisteet" onclick={() => sortBy("points")} class:active={sort.attribute === "points"}> P </th>
                </tr>
            </thead>

            <tbody>
                {#each sortedTeams as team}
                    <tr class:highlight={needsHighlight(team.teamId)} onclick={() => handleClick(team.teamId)} class:clickable={link != "none"}>
                        <td class="flex">
                            <img class="logo" src={getTeamLogo(team.teamId)} alt={team.teamName} />
                            <span>{team.teamName}</span>
                        </td>
                        <td>{team.games}</td>
                        <td>{team.wins}</td>
                        <td>{team.ties}</td>
                        <td>{team.losses}</td>
                        <td>{team.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>

<style lang="scss">
    .liiga.team-standings.widget {
        .logo {
            width: 30px;
            height: 30px;
        }
    }
</style>
