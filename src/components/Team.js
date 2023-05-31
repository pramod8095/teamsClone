import React, { useState } from 'react'

import './Team.css'

const Team = ({ team, id, updateTeam }) => {

  const [channelName, setChannelName] = useState('');

  const changeHandler = (e) => {
    const allChannels = team.channels;
    const val = e.target.value;
    const findIndex = allChannels.findIndex((channel) => channel.name.toLowerCase() === val.toLowerCase());
    if (findIndex == -1) {
      setChannelName(e.target.value);
    } else {
      setChannelName('');
    }
  }

  const submitendler = e => {

    e.preventDefault();

    const allChannels = team.channels;

    const findIndex = allChannels.findIndex((channel) => channel.name.toLowerCase() === channelName.toLowerCase());
    if (findIndex == -1) {
      let channel = {
        name: channelName,
        id: team.channels.length + 1
      }
      const channels = [...allChannels, channel];
      const updatedTeam = {
        ...team,
        channels: channels
      }
      updateTeam(updatedTeam);
      setChannelName('');
    }
    else {
      setChannelName('');
    }

  }

  const deleteChannel = (channel) => {
    const allChannels = team.channels;
    const newChannels = allChannels.filter((ch) => ch.id !== channel.id);
    const updatedTeam = {
      ...team,
      channels: newChannels
    }
    updateTeam(updatedTeam);
  }

  return (
    <div>
      {
        team && <h4 className='mt-0 mb-6' >{team.name}</h4>
      }
      {
        team &&
        <div className='layout-row justify-content-end mb-6'>
          <input
            placeholder='Enter Channel Name'
            className="channel-name-input w-45 px-13"
            data-testid={'channel-name-input-' + id}
            onChange={changeHandler}
            value={channelName}
          />
          <button
            className='channel-name-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid={'add-channel-btn-' + id}
            disabled={!channelName}
            onClick={submitendler}
            value={channelName}
          >
            Add Channel
          </button>
        </div>
      }
      {
        team &&
        <ul className='styled mb-20 pl-25' data-testid={'channel-list-' + id}>
          {team.channels && team.channels.map((channel) => (
            <li
              key={channel.id}
              className='flex slide-up-fade-in justify-content-between align-items-center pl-10 pr-5 py-6 mt-0 mb-6'
            >
              <span>{channel.name}</span>
              <button
                data-testid={'remove-channel-button-' + id + channel.id}
                className='icon-only x-small danger ma-0 pa-0'
                onClick={() => deleteChannel(channel)}
              >
                <i className="material-icons">delete</i>
              </button>
            </li>
          ))}
        </ul>
      }
    </div>

  )
}

export default Team
