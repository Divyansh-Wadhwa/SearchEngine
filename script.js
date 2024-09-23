const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const searchHistoryList = document.getElementById('search-history-list');

let searchHistory = [];

// Load search history from JSON file
fetch('search_history.json')
    .then(response => response.json())
    .then(data => {
        searchHistory = data;
        renderSearchHistory();
    });

// Search button event listener
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchHistory.push(searchTerm);
        saveSearchHistory();
        renderSearchHistory();
        searchInput.value = '';
    }
});

// Clear history button event listener
clearHistoryBtn.addEventListener('click', () => {
    searchHistory = [];
    saveSearchHistory();
    renderSearchHistory();
});

// Save search history to JSON file
function saveSearchHistory() {
    const json = JSON.stringify(searchHistory);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'search_history.json';
    a.click();
}

// Render search history list
function renderSearchHistory() {
    searchHistoryList.innerHTML = '';
    searchHistory.forEach((term, index) => {
        const li = document.createElement('li');
        li.textContent = term;
        searchHistoryList.appendChild(li);
    });
}