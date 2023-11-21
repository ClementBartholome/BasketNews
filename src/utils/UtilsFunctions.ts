export function formatDate(date: any): string {
  if (date instanceof Date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return `${day}/${month}/${year} à ${hours}:${minutes}`
  } else {
    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} à ${dateObj.getHours()}:${
      dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
    }`
  }
}

export function formatTime(date: Date): string {
  const hours = date.getHours()
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  return `${hours}:${minutes}`
}

export function getTeamLogo(teamName: string) {
  switch (teamName) {
    case 'ATL':
      return 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg'
    case 'BKN':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg'
    case 'BOS':
      return 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg'
    case 'CHA':
      return 'https://upload.wikimedia.org/wikipedia/fr/f/f3/Hornets_de_Charlotte_logo.svg'
    case 'CHI':
      return 'https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg'
    case 'CLE':
      return 'https://upload.wikimedia.org/wikipedia/fr/3/36/Logo_Cavaliers_Cleveland_-_2022.svg'
    case 'DAL':
      return 'https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg'
    case 'DEN':
      return 'https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg'
    case 'DET':
      return 'https://upload.wikimedia.org/wikipedia/commons/3/39/Logo_of_the_Detroit_Pistons.png'
    case 'GSW':
      return 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    case 'HOU':
      return 'https://upload.wikimedia.org/wikipedia/fr/e/e1/Houston_Rockets_logo_2019.png'
    case 'IND':
      return 'https://upload.wikimedia.org/wikipedia/fr/4/48/Pacers_de_l%27Indiana_2017.png'
    case 'LAC':
      return 'https://upload.wikimedia.org/wikipedia/fr/c/cb/Clippers_de_Los_Angeles_logo.svg'
    case 'LAL':
      return 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg'
    case 'MEM':
      return 'https://upload.wikimedia.org/wikipedia/fr/8/83/Grizzlies_de_Memphis_2018.png'
    case 'MIA':
      return 'https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg'
    case 'MIL':
      return 'https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg'
    case 'MIN':
      return 'https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg'
    case 'NOP':
      return 'https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg'
    case 'NYK':
      return 'https://upload.wikimedia.org/wikipedia/fr/a/a3/Logo_Knicks_New_York_-_2011.svg'
    case 'OKC':
      return 'https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg'
    case 'ORL':
      return 'https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg'
    case 'PHI':
      return 'https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg'
    case 'PHX':
      return 'https://upload.wikimedia.org/wikipedia/fr/5/56/Phoenix_Suns_2013.png'
    case 'POR':
      return 'https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg'
    case 'SAC':
      return 'https://upload.wikimedia.org/wikipedia/fr/9/95/Kings_de_Sacramento_logo.svg'
    case 'SAS':
      return 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/0e/San_Antonio_Spurs_2018.png/800px-San_Antonio_Spurs_2018.png?20180607120053'
    case 'TOR':
      return 'https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg'
    case 'UTA':
      return 'https://logodetimes.com/times/utah-jazz/logo-utah-jazz-escudo-256.png'
    case 'WAS':
      return 'https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg'
    default:
      return 'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg'
  }
}
