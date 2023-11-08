export interface Article {
  title: string
  pubDate: Date
  link: string
  author: string
  image: string
  description: string
  source: string
}

export interface Source {
  name: string
  logo: string
}

export interface Game {
  id: number
  home_team_score: number
  status: string
  visitor_team_score: number
  home_team: {
    abbreviation: string
  }
  visitor_team: {
    abbreviation: string
  }
}

export interface Team {
  nameAbbreviation: string
  logo: string
}

export interface Player {
  player: {
    first_name: string
    last_name: string
    team_id: number
    position: string
  }
  game: {
    home_team_id: number
    visitor_team_id: number
    home_team_score: number
    visitor_team_score: number
  }
  team: {
    full_name: string
    abbreviation: string
  }
  pts: number
  reb: number
  ast: number
  min: string
  fga: number
  fgm: number
  fg_pct: number
  fg3a: number
  fg3m: number
  fg3_pct: number
  ftm: number
  fta: number
  ft_pct: number
  oreb: number
  dreb: number
  stl: number
  blk: number
  pf: number
  turnover: number
}
