import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        console.log('Search for: ', query);  // Debugging line to see the query
        onSearch(query);  // Call the passed function to notify App.js
    }

    return (
        <div className='SearchBar'>
            <input 
                type='text' 
                value={query}
                onChange={handleSearchChange}
                placeholder='Enter A Song, Album, or Artist'
            />

            <button className='SearchButton' onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default SearchBar;