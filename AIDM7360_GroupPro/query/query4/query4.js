document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单动态效果
    const searchContainer = document.querySelector('.search-container');
    const searchDropdown = document.getElementById('search-dropdown');
    const settingContainer = document.querySelector('.setting-container');
    const settingDropdown = document.getElementById('setting-dropdown');
    const movieInput = document.getElementById('movie-input');

    searchDropdown.style.display = 'none';
    settingDropdown.style.display = 'none';

    searchContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = searchDropdown.style.display === 'flex';
        settingDropdown.style.display = 'none';
        searchDropdown.style.display = isOpen ? 'none' : 'flex';
    });

    settingContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = settingDropdown.style.display === 'flex';
        searchDropdown.style.display = 'none';
        settingDropdown.style.display = isOpen ? 'none' : 'flex';
    });

    document.addEventListener('click', function() {
        searchDropdown.style.display = 'none';
        settingDropdown.style.display = 'none';
    });

    searchDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    settingDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    
});