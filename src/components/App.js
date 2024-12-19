import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';
import LoadingScreen from './LoadingScreen';

function App() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState({
            name: 'My Playlist', // default playlist Name
            tracks: [] //list of tracks in the playlist
        }); // State for the playlist

    const [isSaving, setIsSaving] = useState(false);

    // Search function to filter tracks based on the query
    const handleSearch = (query) => {
       // console.log("Searching for:", query);  // Debugging line to see the query

        Spotify.search(query).then(tracks => {
            setTracks(tracks);
        });
    };

    const handleAddToPlaylist = (track) => {
        // Check if the track is already in the playlist by its id
        const trackExists = playlist.tracks.some(existingTrack => existingTrack.id === track.id);
        
        if (trackExists) {
            alert('This track is already in your playlist!');
            return; // Exit early if the track already exists
        }

        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            tracks: [...prevPlaylist.tracks, track]
        }))
    };

    const handleRemoveFromPlaylist = (trackId) => {
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            tracks: prevPlaylist.tracks.filter(track => track.id !== trackId)
        }));
    };

    const handlePlaylistNameChange = (newName) => {
        setPlaylist(prevPlaylist => ({
            ...prevPlaylist, 
            name: newName
        }));
    };

    // New function to handle saving the playlist to Spotify
    const handleSaveToSpotify = () => {
        if (playlist.tracks.length === 0) {
            alert("Your playlist is empty! Add some tracks first.");
            return;
        }

        setIsSaving(true); // show loading Screen

        // Extract URIs from the playlist
        const trackUris = playlist.tracks.map(track => track.uri);
        
        // Saving to Spotify 
        Spotify.savePlaylist(playlist.name, trackUris).then(() => {
            alert('Playlist saved to Spotify!');
            setPlaylist({
                name: 'My Playlist',
                tracks: []
            });
        })
        .catch((error) => {
            alert('An error occured while saving the playlist. Please try again.');
            console.error(error);
        })
        .finally(() => {
            setIsSaving(false); // Hide the loading screen
        });

        // Check if trackUris array is populated
    if (trackUris.length === 0) {
        // console.log("No tracks have URIs. Check track objects.");
        alert("No tracks have URIs. Check track objects.");
    }


     // Convert the track URIs to a string for the alert
     const urisString = trackUris.join('\n');  // Join the URIs with newlines for readability

     // Show the URIs in an alert (if they are available)
     if (urisString) {
         alert("Saving the following tracks to Spotify:\n" + urisString);
     } else {
         alert("No tracks in the playlist have URIs.");
     }

        // Reset the playlist after saving
        setPlaylist({
            name: 'My Playlist',
            tracks: []
        });
    };

    useEffect(() => {
        Spotify.getTopTracks().then(tracks => {
            setTracks(tracks);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error loading tracks', error);
            setLoading(false);
        })
    }, []); // Run only once on initial render

    

    return (
        <div className='App'>
            <h1>Jamming</h1>
            {isSaving && <LoadingScreen message="Saving Your Playlist..." />}
            <SearchBar onSearch={handleSearch} />

            <div className='App-body'>
                {loading ? (
                    <p>Loading popular tracks...</p>
                ) : (
                    <>
                        <SearchResults tracks={tracks} onAddToPlaylist={handleAddToPlaylist} />
                        <div className="Playlist">
                            
                            <Playlist 
                                playlist={playlist} 
                                onPlaylistNameChange={handlePlaylistNameChange}
                                onRemoveFromPlaylist={handleRemoveFromPlaylist}
                            />
                            <div className="SaveButtonContainer">
                                <button className="SaveButton" onClick={handleSaveToSpotify}>Save To Spotify</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;