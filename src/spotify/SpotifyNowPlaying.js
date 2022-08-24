import { useEffect, useState } from "react";
import spotifyService from "../services/spotify";
import SpotifyLogo from "./SpotifyLogo";

const SpotifyNowPlaying = ({ handleNotification, user }) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(() => {
        try {
            spotifyService.getNowPlayingItem()
            .then((results) => { 
                setResult(results)
                setLoading(false)
            })
        }
        catch (exception) {
            console.log(exception)
            handleNotification(exception.response.data.error, 'error')
        }
    })

    return (
        <div>
            {`Welcome ${user.name}!`}
            {loading && <p>Connecting to spotify...</p>}
            {(!loading && !result.isPlaying) && (
                <div>
                    <SpotifyLogo />
                    <span>Currently not playing a song!</span>
                </div>
            )}
            {(!loading && result.isPlaying) && (
                <div>
                    <div>
                        <SpotifyLogo />
                        <span>Now playing</span>
                    </div>
                    <div>
                        <img src={result.albumImageUrl} alt={`${result.title} album art`}/>
                        <a href={result.songUrl} target="_blank" rel="noreferrer">{result.title}</a>
                        <p>{result.artist}</p>
                    </div>
                </div>
            )}
        </div>
    )
};

export default SpotifyNowPlaying