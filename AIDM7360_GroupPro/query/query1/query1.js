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

    // 电影搜索功能
    let moviesData = [];

    fetch('../../movie_json_data/Movie.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载电影数据');
            }
            return response.json();
        })
        .then(data => {
            moviesData = data;
            console.log(`成功加载 ${moviesData.length} 条电影数据`);
        })
        .catch(error => {
            console.error('加载 JSON 失败:', error); // 仅控制台输出，无弹窗
        });

    movieInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const inputValue = this.value.trim().toLowerCase();
            if (!inputValue) {
                alert("请输入电影名！"); // 保留必要的用户提示
                return;
            }

            if (moviesData.length === 0) {
                console.log("电影数据加载中，请稍候"); // 控制台输出，无弹窗
                return;
            }

            // 本地精确搜索 (不区分大小写)
            const searchResults = moviesData.filter(movie => 
                movie.title && movie.title.toLowerCase() === inputValue
            );

            if (searchResults.length > 0) {
                const targetMovie = encodeURIComponent(searchResults[0].title);
                window.location.href = `../../detail/movie_detail/movie_detail.html?movie=${targetMovie}`;
            } else {
                alert(`未找到包含"${inputValue}"的电影，请重新输入！`); // 保留必要的用户提示
                this.value = '';
            }
        }
    });
});