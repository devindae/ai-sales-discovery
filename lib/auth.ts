export const teams = [
  {
    username: "teama",
    password: "nexa2026",
    teamId: "TEAM_A",
    teamName: "Team A",
  },
  {
    username: "teamb",
    password: "nexa2026",
    teamId: "TEAM_B",
    teamName: "Team B",
  },
  {
    username: "teamc",
    password: "nexa2026",
    teamId: "TEAM_C",
    teamName: "Team C",
  },
  {
    username: "teamd",
    password: "nexa2026",
    teamId: "TEAM_D",
    teamName: "Team D",
  },
];

export function validateLogin(
  username: string,
  password: string
) {
  return teams.find(
    (team) =>
      team.username.toLowerCase() ===
        username.toLowerCase() &&
      team.password === password
  );
}