import React from "react";

function Track({track, onAddToPlaylist, onRemoveFromPlaylist }) {
    //console.log(name, artist, album);

    if (!track) {
        console.error("Track data is missing or undefined:", track);
        return <div>Error: Track data is missing!</div>;  // This will help debug if `track` is undefined
    }

    const { id, name, artist, album } = track;

    const handleAddToPlaylist = () => {
        console.log("Adding to playlist:", { track });
        onAddToPlaylist(track);
    };

    const handleRemoveFromPlaylist = () => {
        onRemoveFromPlaylist(id);  // Remove from playlist by ID
    };

    const handleAddClick = (event) => {
        event.stopPropagation(); // Prevent event bubbling if needed
        console.log("Adding track to playlist:", track);
        onAddToPlaylist(track);  // Correctly pass the track object
    };

    if (!track) {
        return <div>Error: Track data is missing!</div>;  // This will help debug if `track` is undefined
    }

    

    return (
        <div className="Track">
            <p>Song: {name}</p>
            <p>Artist Name: {artist}</p>
            <p>Album: {album}</p>
            {onRemoveFromPlaylist ? (
                <button onClick={handleRemoveFromPlaylist}>Remove from Playlist</button> // Show remove button in playlist
            ) : (
                <button onClick={handleAddToPlaylist}>Add to Playlist</button> // Show add button in search results
            )}
        </div>
    )
}

export default Track;