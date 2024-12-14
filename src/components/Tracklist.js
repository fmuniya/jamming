import React from "react";
import Track from './Track';

function Tracklist({ tracks, onAddToPlaylist, onRemoveFromPlaylist }) {
    
    console.log("Tracks in Tracklist: ", tracks); 

    if (!Array.isArray(tracks) || tracks.length === 0) {
        return <div>No tracks available</div>; // Optionally display a message if no tracks exist
    }

    return (
        <div className='Tracklist'>
            {tracks.map(track => (
                <Track 
                key={track.id}  // Ensure each track has a unique key
                track={ track }
                /* id={track.id} 
                name={track.name} 
                artist={track.artist} 
                album={track.album}  */
                onAddToPlaylist={onAddToPlaylist} // Ensure `onAddToPlaylist` is passed properly
                onRemoveFromPlaylist={onRemoveFromPlaylist}
            />
            ))}
        </div>
    );
}

export default Tracklist;