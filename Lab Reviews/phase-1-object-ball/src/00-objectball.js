function gameObject () {
    return {
        home: {
            team_name: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: [
                {
                    player_name: "Alan Anderson",
                    number: 0,
                    shoe: 16,
                    points: 22,
                    rebounds: 12,
                    assists: 12,
                    steals: 3,
                    blocks: 1,
                    slam_dunks: 1
                },
                {
                    player_name: "Reggie Evans",
                    number: 30,
                    shoe: 14,
                    points: 12,
                    rebounds: 12,
                    assists: 12,
                    steals: 12,
                    blocks: 12,
                    slam_dunks: 7
                },
                {
                    player_name: "Brook Lopez",
                    number: 11,
                    shoe: 17,
                    points: 17,
                    rebounds: 19,
                    assists: 10,
                    steals: 3,
                    blocks: 1,
                    slam_dunks: 15
                },
                {
                    player_name: "Mason Plumlee",
                    number: 1,
                    shoe: 19,
                    points: 26,
                    rebounds: 11,
                    assists: 6,
                    steals: 3,
                    blocks: 8,
                    slam_dunks: 5
                },
                {
                    player_name: "Jason Terry",
                    number: 31,
                    shoe: 15,
                    points: 19,
                    rebounds: 2,
                    assists: 2,
                    steals: 4,
                    blocks: 11,
                    slam_dunks: 1
                }
            ]
        },
        away: {
            team_name: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: [
                {
                    player_name: "Jeff Adrien",
                    number: 4,
                    shoe: 18,
                    points: 10,
                    rebounds: 1,
                    assists: 1,
                    steals: 2,
                    blocks: 7,
                    slam_dunks: 2
                },
                {
                    player_name: "Bismack Biyombo",
                    number: 0,
                    shoe: 16,
                    points: 12,
                    rebounds: 4,
                    assists: 7,
                    steals: 22,
                    blocks: 15,
                    slam_dunks: 10
                },
                {
                    player_name: "DeSagna Diop",
                    number: 2,
                    shoe: 14,
                    points: 24,
                    rebounds: 12,
                    assists: 12,
                    steals: 4,
                    blocks: 5,
                    slam_dunks: 5
                },
                {
                    player_name: "Ben Gordon",
                    number: 8,
                    shoe: 15,
                    points: 33,
                    rebounds: 3,
                    assists: 2,
                    steals: 1,
                    blocks: 1,
                    slam_dunks: 0
                },
                {
                    player_name: "Kemba Walker",
                    number: 33,
                    shoe: 15,
                    points: 6,
                    rebounds: 12,
                    assists: 12,
                    steals: 7,
                    blocks: 5,
                    slam_dunks: 12
                }
            ]
        }
    }
}

const allPlayers = () => {
    // return [ ...gameObject().home.players, ...gameObject().away.players ]
    // return gameObject().home.players.concat( gameObject().away.players )
    let players = []
    for ( let location in gameObject() )
        players = [ ...players,  ...gameObject()[ location ].players ]
    return players
}

const getPlayerByName = name => allPlayers().find( player => player.player_name === name )

const numPointsScored = playerName => getPlayerByName( playerName ).points

const shoeSize = playerName => getPlayerByName( playerName ).shoe

const getTeamByName = teamName => {
    for ( let location in gameObject() )
        if ( gameObject()[ location ].team_name === teamName )
            return gameObject()[ location ]
}

const teamColors = teamName => getTeamByName( teamName ).colors

const teamNames = () => {
    let names = []
    for ( let key in gameObject() )
        names.push( gameObject()[ key ].team_name )
    return names
}

const playerNumbers = teamName => getTeamByName( teamName ).players.map( player => player.number )

const playerStats = playerName => {
    let player = { ...getPlayerByName( playerName ) }
    delete player.player_name
    return player
}

const sortPlayers = sortBy => allPlayers().sort( ( player1, player2 ) => player2[ sortBy ] - player1[ sortBy ] )

const bigShoeRebounds = () => sortPlayers( 'shoe' )[0].rebounds

const mostPointsScored = () => sortPlayers( 'points' )[0]

const playerWithLongestName = () => allPlayers().sort( ( player1, player2 ) => player2.player_name.length - player1.player_name.length )[0]

const winningTeam = () => {
    let teams = []

    for ( let key in gameObject() ) {
        let teamInfo = {}

        teamInfo.name = gameObject()[ key ].team_name
        teamInfo.totalPoints = 0

        gameObject()[ key ].players.forEach( player => teamInfo.totalPoints += player.points )
        
        teams.push( teamInfo )
    }

    return teams.sort( ( team1, team2 ) => team2.totalPoints - team1.totalPoints )[0].name
    
}

const doesLongNameStealATon = () => {
    let playerMostSteals = sortPlayers( 'steals' )[0]

    return playerWithLongestName().player_name === playerMostSteals.player_name
}
// debugger