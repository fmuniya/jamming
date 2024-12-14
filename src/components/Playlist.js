import React, { useState } from "react";
import Tracklist from './Tracklist';

function Playlist({ playlist, onPlaylistNameChange, onRemoveFromPlaylist  }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState(playlist.name);

    // Toggle editing mode on click
    const handleTitleClick = () => {
        setIsEditing(true); // Enable editing mode when clicked
    };

     // Handle input changes
     const handleNameChange = (event) => {
        setNewPlaylistName(event.target.value); // Update state as user types
    };

     // Handle saving the new name
     const handleSaveName = () => {
        setIsEditing(false); // Disable editing mode
        onPlaylistNameChange(newPlaylistName); // Notify parent component to update the name
    };

    // Save name when the user presses Enter or clicks outside
    const handleBlur = () => {
        handleSaveName(); // Save name when input loses focus
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSaveName(); // Save name when Enter key is pressed
        }
    };


    return (
        <div className="Playlist">
            <h2>
                {/* If editing, show input field, else show the playlist name */}
                {isEditing ? (
                    <input
                        type="text"
                        value={newPlaylistName}
                        onChange={handleNameChange}
                        onBlur={handleBlur} // Save name when input loses focus
                        onKeyPress={handleKeyPress} // Save on Enter key press
                        autoFocus // Focus the input field when editing
                    />
                ) : (
                    <span onClick={handleTitleClick}>{playlist.name}</span> // Click to edit the title
                )}
            </h2>

            {playlist.tracks.length === 0 ? (
                <p>No tracks added to the playlist.</p>
            ) : (
                <Tracklist 
                    tracks={playlist.tracks} 
                    //onAddToPlaylist={onAddToPlaylist} 
                    onRemoveFromPlaylist={onRemoveFromPlaylist}
                />
            )}
            {/* <button className="SaveButton">Save To Spotify</button> */}
        </div>
    );
}

export default Playlist;