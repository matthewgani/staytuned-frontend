import { useEffect, useState } from "react";
import SpotifyAPI from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";

const SpotifyNowPlaying = () => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(() => {
      SpotifyAPI.getNowPlayingItem()
        .then((results) => { 
          setResult(results)
          setLoading(false)
        })
    })

    return (
        <div>
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