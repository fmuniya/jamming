import React, { useEffect, useState } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState({
            name: 'My Playlist', // default playlist Name
            tracks: [] //list of tracks in the playlist
        }); // State for the playlist

    // Search function to filter tracks based on the query
    const handleSearch = (query) => {
        console.log("Searching for:", query);  // Debugging line to see the query

        const allTracks = [
            { id: 1, name: "One Mic", artist: "Nas", album: "Stillmatic", uri: "spotify:track:1" },
            { id: 2, name: "Waves", artist: "Joey Bada$$", album: "1999", uri: "spotify:track:2" },
            { id: 3, name: "Gloria", artist: "Kendrick Lamar", album: "GNX", uri: "spotify:track:3" }
        ];

        const filteredTracks = allTracks.filter(track => 
            track.name.toLowerCase().includes(query.toLowerCase()) || 
            track.artist.toLowerCase().includes(query.toLowerCase()) ||
            track.album.toLowerCase().includes(query.toLowerCase())
        );

        console.log("Filtered tracks:", filteredTracks);  // Check filtered tracks
        setTracks(filteredTracks);  // Update the state with the filtered tracks
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

        // Extract URIs from the playlist
        const trackUris = playlist.tracks.map(track => track.uri);
        
        // Mock saving to Spotify (in a real app, this would interact with the Spotify API)
        console.log("Saving the following tracks to Spotify:", trackUris);

        // Check if trackUris array is populated
    if (trackUris.length === 0) {
        console.log("No tracks have URIs. Check track objects.");
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
        setTimeout(() => {
            const initialTracks = [
                { id: 1, name: "One Mic", artist: "Nas", album: "Stillmatic", uri: "spotify:track:1" },
                { id: 2, name: "Waves", artist: "Joey Bada$$", album: "1999", uri: "spotify:track:2" },
                { id: 3, name: "Gloria", artist: "Kendrick Lamar", album: "GNX", uri: "spotify:track:3" }
            ];
            setTracks(initialTracks);
            setLoading(false);
        }, 2000); // Simulate a 2-second delay
    }, []);

    return (
        <div className='App'>
            <h1>Jamming</h1>
            <SearchBar onSearch={handleSearch} />

            <div className='App-body'>
                {loading ? (
                    <p>Loading tracks...</p>
                ) : (
                    <>
                        <SearchResults tracks={tracks} onAddToPlaylist={handleAddToPlaylist} />
                        <Playlist 
                            playlist={playlist} 
                            //playlist={{name: 'Random Playlist', tracks: [{id: 1, name: 'Track1', artist: 'Artist 1', album: 'Album 1' }]}}
                            onPlaylistNameChange={handlePlaylistNameChange}
                            onRemoveFromPlaylist={handleRemoveFromPlaylist}
                        />
                        <button className="SaveButton" onClick={handleSaveToSpotify}>Save To Spotify</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;