const clientId = 'b7aba0fdd3cd4f199f1a51caa4f9e0b7'; // Spotify app client ID
const redirectUri = 'http://localhost:3000/'; // redirect URI (must match Spotify Dashboard)
let accessToken;

const Spotify = {
    getAccessToken() {
        // Check if the token is already set
        if (accessToken) {
            return accessToken;
        }

        // Check for token and expiration time in the URL
        const urlParams = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (urlParams && expiresInMatch) {
            accessToken = urlParams[1]; // Extract the access token from URL
            const expiresIn = Number(expiresInMatch[1]); // Token expiration time in seconds

            // Clear the token from the URL to avoid issues
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // Clear URL parameters

            return accessToken;
        } else {
            // If no token, redirect to Spotify authorization endpoint
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location = authUrl;
        }

    },

    getTopTracks() {
        const token = this.getAccessToken();
        const popularTracksEndPoint = `https://api.spotify.com/v1/playlists/774kUuKDzLa8ieaSmi8IfS?si=KxUb4mt9QWSPqLxlCBEl6A`; // get Spotify's top 50 global playlist

        return fetch(popularTracksEndPoint, {
            headers: { Authorization: `Bearer ${token}` },
        })

            .then(response => response.json())
            .then(data => {
                //console.log('Top Tracks API response:', data); // Debug
                if (!data.tracks) return [];
                return data.tracks.items.slice(0, 5).map(item => ({
                    id: item.track.id,
                    name: item.track.name,
                    album: item.track.album.name,
                    artists: item.track.artists,
                    uri: item.track.uri,
                    previewUrl: item.track.preview_url,
                }));
            })
            .catch(error => {
                console.error('Error fetching top tracks:', error); // Handle errors
            })
    },

    async search(term) {
        const token = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        // console.log("Spotify API response:", data);
        if (!data.tracks) return [];
        return data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            previewUrl: track.preview_url,
        }));
    },


    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) return;

        const token = Spotify.getAccessToken();
        let userId;

        // Get the user's Spotify ID
        return fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(data => {
                userId = data.id;
                // Create a new playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: name }),
                });
            })
            .then(response => response.json())
            .then(playlist => {
                const playlistId = playlist.id;
                // Add tracks to the new playlist
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uris: trackUris }),
                });
            });
    },
};

export default Spotify;
