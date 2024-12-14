import React from 'react';
import Tracklist from './Tracklist';
import Track from './Track';

function SearchResults({tracks, onAddToPlaylist}) {
    if (!tracks || tracks.length === 0) { //  If no tracks are passed (empty or undefined), show a message
        return <div>No Tracks Available.</div>
    }
    
    return (
        <div className='SearchResults'>
            <h2>Search Results</h2>
            <div className='Tracklist'>
                {/* Map over the tracks and render each Track component */}
                {tracks.map((track) => (
                    <Track 
                    key={track.id}
                    track={track} 
                    /* id={track.id}
                    name={track.name} 
                    artist={track.artist} 
                    album={track.album} */ 
                    onAddToPlaylist={onAddToPlaylist} // Pass down the function here
                />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;