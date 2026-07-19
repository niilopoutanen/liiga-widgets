export const teams = [
  { id: "ässät", color: "#D71920", homepage: "https://assat.com" },
  { id: "hifk", color: "#052968", homepage: "https://hifk.fi" },
  { id: "hpk", color: "#ED7E24", homepage: "https://hpk.fi" },
  { id: "ilves", color: "#FDCE05", homepage: "https://ilves.com" },
  { id: "jukurit", color: "#0057B8", homepage: "https://jukurit.fi" },
  { id: "jokerit", color: "#D70E29", homepage: "https://jokerit.fi" },
  { id: "jyp", color: "#ED1C28", homepage: "https://jypliiga.fi" },
  { id: "kalpa", color: "#FFC608", homepage: "https://kalpa.fi" },
  { id: "kärpät", color: "#FDBB14", homepage: "https://karpat.fi" },
  { id: "k-espoo", color: "#0174CD", homepage: "https://kiekko-espoo.fi" },
  { id: "kookoo", color: "#EF721F", homepage: "https://kookoo.fi" },
  { id: "lukko", color: "#FFCC00", homepage: "https://raumanlukko.fi" },
  { id: "pelicans", color: "#52BFDE", homepage: "https://pelicans.fi" },
  { id: "saipa", color: "#FEF60F", homepage: "https://saipa.fi" },
  { id: "sport", color: "#F01E23", homepage: "https://vaasansport.fi" },
  { id: "tappara", color: "#FF6400", homepage: "https://tappara.fi" },
  { id: "tps", color: "#000000", homepage: "https://hc.tps.fi" },
];
const logos = import.meta.glob("../assets/logos/*.svg", {
  eager: true,
  import: "default"
});

export function getTeamLogo(id) {
  if (id.includes(":")) {
    const parts = id.split(":");
    id = parts[1];
  }
  return logos[`../assets/logos/${id}.svg`] ?? null;
}

export function getTeam(id) {
  return teams.find(team => team.id === id) ?? null;
}

export function parseId(teamId) {
  return String(teamId).split(":").pop();
}

export function getTeamColor(teamId) {
  const id = teamId.split(":")[1];
  return teams.find((team) => team.id === id)?.color ?? "#888";
}