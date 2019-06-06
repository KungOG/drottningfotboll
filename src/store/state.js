export default {

  /* Sparat datum och tiden ifrån Kalendern */
  date: '',
  time: '',

  /* Spelare och Användare  */
  allUsers: [],
  teamPlayers: [],

  /* Den aktuella användaren och spelaren */
  currentUser: {},
  player: {},

  /* Spel Data */
  specificTeamData: [],
  currentGame: [],

  /* Valt lag */
  selectedTeam: '',

  /* Skapa lagen och poäng regler */
  numberOfTeams: 0,
  numberOfGames: 0,
  numberOfWin: 0,
  numberOfLoss: 0,
  numberOfEqual: 0,
  
  
  /* Grupperna ifrån Admin */
  groups : [
    {
      players: [],
      id: 0
    },
    {
      name: 'Grupp 1',
      players: [],
      id: 1
    },
    {
      name: 'Grupp 2',
      players: [],
      id: 2
    },
    {
      name: 'Grupp 3',
      players: [],
      id: 3
    },
    {
      name: 'Grupp 4',
      players: [],
      id: 4
    },
    {
      name: 'Grupp 5',
      players: [],
      id: 5
    }
  ],
}
