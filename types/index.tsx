type Gender = "M" | "F" | null;

type LiveStatus = "FT" | "HT" | "-" | "Cancelled" | string;

export interface Match {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  countryId: string;
  country: string;
  timestamp: number;
  date: string;
  time: string;
  status: MatchStatus;
  round: RoundInfo;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  homeScore: ScoreInfo;
  awayScore: ScoreInfo;
  liveStatus: LiveStatus;
}

export interface MatchStatus {
  code: number;
  type: string;
}

export interface RoundInfo {
  round: number;
}

export interface TeamInfo {
  id: number;
  name: string;
  slug: string;
  gender: Gender;
  subTeams: any[];
}

export interface ScoreInfo {
  current: number;
  period1: number | null;
  normaltime: number | null;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface Action {
  type: string;
}
export interface StateType {
  items: Match[];
  filteredItems: Match[];
}
