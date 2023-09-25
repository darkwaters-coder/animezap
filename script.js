const apiUrl = "https://api.consumet.org/anime/gogoanime/";

async function fetchRecentEpisodes(query, page = 1) {
  try {
    const response = await axios.get(apiUrl + query, { params: { page } });
    const animelist = response.data.results;

    const recentEpisodesSection = document.getElementById('recent-episodes');

    // Clear any existing content
    recentEpisodesSection.innerHTML = '';

    // Loop through the recent episodes and create HTML elements for each
    animelist.forEach(episode => {
      const episodeCard = document.createElement('div');
      episodeCard.classList.add('anime-card');

      const thumbnail = document.createElement('img');
      thumbnail.src = episode.image;
      thumbnail.alt = episode.title;

      const title = document.createElement('h2');
      title.innerText = episode.title;

      const link = document.createElement('a');
      link.href = episode.url;
      link.appendChild(thumbnail);
      link.appendChild(title);

      episodeCard.appendChild(link);
      recentEpisodesSection.appendChild(episodeCard);
    });
  } catch (error) {
    console.error('Error fetching episodes:', error.message);
  }
}

// Search button click event handler
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input').value;
  if (searchInput.trim() !== '') {
    fetchRecentEpisodes(searchInput);
  }
});

// Call the function to fetch and display recent episodes
fetchRecentEpisodes('recent-episodes');
