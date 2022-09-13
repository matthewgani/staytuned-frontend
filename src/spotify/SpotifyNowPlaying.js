import { useEffect, useState } from "react";
import spotifyService from "../services/spotify";
import SpotifyLogo from "./SpotifyLogo";
import { useNavigate } from "react-router-dom";
import { Button, Image, Flex} from '@chakra-ui/react'

const SpotifyNowPlaying = ({ handleNotification, user, refresh_token }) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});
    const navigate = useNavigate()


    const redirectToAuth = () => {
        // set show dialog to false after testing is done
        handleNotification('Redirecting to spotify auth!', 'info')
        navigate('/spotifyAuth')
    }

    useEffect(() => {
        try {
            if (refresh_token) {
                spotifyService.getNowPlayingItem()
                .then((results) => { 
                    setResult(results)
                    setLoading(false)
                })
            }
        }
        catch (exception) {
            console.log(exception)
            handleNotification(exception.response.data.error, 'error')
        }
    })

    return (
        <div>
            {`Welcome ${user.name}!`}
            <SpotifyLogo />
            {!refresh_token && <div><Button onClick={redirectToAuth}>Login to spotify to use the app!</Button> </div>}
            {(refresh_token && loading) && <p>Connecting to spotify...</p>}
            {(!loading && !result.isPlaying) && (
                <div>
                    <SpotifyLogo />
                    <span>Currently not playing a song!</span>
                </div>
            )}
            {(!loading && result.isPlaying) && (
                <Flex minWidth='max-content' direction='column' justify ='center' alignItems='center' gap='2'>
                    <div>
                        <span>Now playing</span>
                    </div>
                    <div>
                        <Image boxSize='300px' src={result.albumImageUrl} alt={`${result.title} album art`}/>
                        <a href={result.songUrl} target="_blank" rel="noreferrer">Title: {result.title}</a>
                        <p>Artists: {result.artist}</p>
                    </div>
                </Flex>
            )}
        </div>
    )
};

export default SpotifyNowPlaying