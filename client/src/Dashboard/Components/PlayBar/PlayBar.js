import React, { useState, useEffect } from 'react'
import './Playbar.css'
import { GiPreviousButton, GiNextButton, GiPlayButton, GiPauseButton } from 'react-icons/gi'
import { RiRepeatFill, RiShuffleFill, RiVolumeMuteFill, RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/callback/',
  clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
  clientSecret: "58a04698e6f64fd787c8cbcf08e40824"
});

const PlayBar = () => {
    const [play, setPlay] = useState(true)
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("credentials"))
        const accessToken = credentials.accessToken
    axios.post("/addToQueue", {
        accessToken
    })
    }, [])
    
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("credentials"))
        const accessToken = credentials.accessToken
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMyDevices().then(res => {
            console.log(res.body.devices)
        }, [])
    })
    const PLAY = (e) => {
            if (play) {
                return (
                <GiPlayButton className="play-button"style={{fill: "white"}} />
                )
            }
            else {
                return (
                <GiPauseButton className="pause-button" style={{fill: "white"}} />
                )
                }
        
    }

    return (
        <div className="playbar">
            <div className="playbar-container">
                <div className="playbar-current-track">
                    <div className="placeholder-track">Current song playing placeholder</div>
                </div>
                <div className="playbar-play-controls">
                <div className="playbar-play-icons">
                <RiShuffleFill className="shuffle-button"style={{fill: "white"}}/>
                <GiPreviousButton className="previous-button"style={{fill: "white"}} />
                <button className="pause-play-button" onClick={e => {
                    setPlay(!play)
                }}>
                {PLAY()}
                </button>     
                <GiNextButton className="next-button" style={{fill: "white"}} />
                <RiRepeatFill className="repeat-button" style={{fill: "white"}}/>
                </div>
                <button className="song-length-bar" />
                </div>
            <div className="playbar-volume-container">
                <RiVolumeUpFill className="volume-button" style={{fill: "white"}}/>
                <button className="volume-bar" />
            </div>
            </div>
        </div>
    )
}

export default PlayBar
