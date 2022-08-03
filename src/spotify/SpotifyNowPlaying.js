import { useEffect, useState } from "react";
import SpotifyAPI from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";

const SpotifyNowPlaying = (props) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});
    // useEffect(() => {

    //     Promise.all([
    //         getNowPlayingItem(
    //             props.client_id,
    //             props.client_secret,
    //             props.refresh_token
    //         ),
    //     ]).then((results) => {
    //         setResult(results[0]);
    //         setLoading(false);
    //     });
    // });

    useEffect(() => {
      SpotifyAPI.getNowPlayingItem()
        .then((results) => { 
          setResult(results)
          setLoading(false)
        })
    })
    
    if (loading) {
      return (
        <div>
          <p>Connecting to spotify...</p>
        </div>
      )
    }
    else if (!loading && !result.isPlaying){
      return (
        <div>
          <SpotifyLogo />
          <span>Currently not playing a song!</span>
        </div>
      )
    }
    else if(!loading && result.isPlaying) {
      return (
      <div>
        <div>
            <SpotifyLogo />
            <span>Now playing</span>
        </div>
        <div>
            <img src={result.albumImageUrl} alt={`${result.title} album art`}/>
            {/* <PlayingAnimation /> */}
            <a href={result.songUrl} target="_blank" rel="noreferrer">{result.title}</a>
            <p>{result.artist}</p>
        </div>
      </div>
      )
    }


    // return (
    //     <div>
    //         {loading && <p>Loading...</p>}
    //         {!loading && (result['isPlaying'] === false)(
    //             <div>
    //                 <SpotifyLogo />
    //                 <span>Currently offline"</span>
    //             </div>
    //         )}
    //         {!loading && (result['isPlaying'] === true) (
    //             <div>
    //                 <div>
    //                     <SpotifyLogo />
    //                     <span>Now playing</span>
    //                 </div>
    //                 <div>
    //                     <img src={result.albumImageUrl} alt={`${result.title} album art`}/>
    //                     {/* <PlayingAnimation /> */}
    //                     <a href={result.songUrl} target="_blank" rel="noreferrer">{result.title}</a>
    //                     <p>{result.artist}</p>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // )
};

export default SpotifyNowPlaying