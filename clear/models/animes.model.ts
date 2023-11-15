export interface interfaceAnimes {
  date?: string;
  name: string;
  alreadyAttended: string;
  qtdEpisodes: string;
  dateLaunch: string;
  note: string;
  status: string;
  nextSeason: string;
  prevSeason: string;
  synopsis: string;
  urlImg?: string;
}

export interface interfaceAnimesGet {
  _id:string,
  date?: string;
  name: string;
  alreadyAttended: string;
  qtdEpisodes: string;
  dateLaunch: string;
  note: string;
  status: string;
  nextSeason: string;
  prevSeason: string;
  synopsis: string;
  urlImg?: string;
}
