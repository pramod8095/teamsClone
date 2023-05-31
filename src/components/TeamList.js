import React, { useState } from 'react'
import Team from './Team'

import './TeamList.css'

const TeamList = () => {
  const [teamname, setteamname] = useState('');
  const [teamList, setTeamList] = useState([
    {
      name: 'Team1',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    },
    {
      name: 'Team2',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    }
  ]);

  const changehandler = e => {
    const val = e.target.value;
    const findIndex = teamList.findIndex((team) => team.name.toLowerCase() === val.toLowerCase());
    if (findIndex == -1) {
      setteamname(val);
    } else {
      setteamname('');
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let team = {
      name: teamname,
      channels: []
    }

    const teams = [...teamList, team];
    setTeamList(teams);
    setteamname('');
  }

  const updateTeam = (team) => {
    
    const teamToUpdateIndex = teamList.findIndex(tm => tm.name === team.name);

    const updatedTeams = teamList.map((t, index) => {
      if (index === teamToUpdateIndex) {
        return { name: t.name, channels: team.channels }
      }
      return t;
    })
    setTeamList(updatedTeams);
  }

  return (
    <div className='w-50 mx-auto'>
      <div className='card w-35 mt-50 mx-auto px-10 py-15'>
        <div className='layout-column' data-testid='team-list'>
          {teamList && teamList.map((team, id) => (
            <Team
              key={id}
              id={id}
              team={team}
              updateTeam={updateTeam}
            />
          ))}
        </div>
        <div className='layout-row'>
          <input
            placeholder='Enter Team Name'
            className='team-list-input w-75'
            data-testid='team-name-input'
            value={teamname}
            onChange={changehandler}
          />
          <button
            className='team-list-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid='add-team-btn'
            disabled={!teamname}
            onClick={submitHandler}

          >
            Add Team
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamList
