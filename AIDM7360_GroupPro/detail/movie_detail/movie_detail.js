document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单动态效果
    const searchContainer = document.querySelector('.search-container');
    const searchDropdown = document.getElementById('search-dropdown');
    const settingContainer = document.querySelector('.setting-container');
    const settingDropdown = document.getElementById('setting-dropdown');

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

   // 1. 工具函数：处理 null/undefined，转为 N/A
    function safe(value) {
        return value === null || value === undefined ? 'N/A' : String(value).trim();
    }

    // 2. 工具函数：日期格式转换（YYYY-MM-DD → YYYY/MM/DD，匹配示例）
    function formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        return dateStr.replace(/-/g, '/'); // 横杠转斜杠
    }

    // 3. 从 URL 获取电影名参数
    function getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = window.location.search.substr(1).match(reg);
        return r ? decodeURIComponent(r[2]) : null;
    }
    const movieName = getUrlParam('movie');

    // 4. 填充电影详情（仅匹配 11 个 JSON 字段）
    function fillMovieData(movie) {
        document.getElementById('movie-name').textContent = safe(movie.title);
        document.getElementById('release-date').textContent = formatDate(movie.release_date);
        document.getElementById('duration').textContent = safe(movie.duration);
        document.getElementById('genres').textContent = safe(movie.main_genre);
        document.getElementById('description').textContent = safe(movie.description);
        document.getElementById('rating').textContent = safe(movie.rating);
        document.getElementById('country-origin').textContent = safe(movie.country);
        document.getElementById('production-company').textContent = safe(movie.production_company);
        document.getElementById('opening-weekend').textContent = safe(movie.budget); // budget 对应首映周末票房
        document.getElementById('worldwide').textContent = safe(movie.total_gross_worldwide);
    }

    // 5. 加载 JSON 数据并渲染
    fetch('../../movie_json_data/Movie.json') // 确认路径正确（根目录 → movie_json_data）
        .then(response => {
            if (!response.ok) throw new Error(`加载失败：${response.status}`);
            return response.json();
        })
        .then(moviesData => {
            // 不区分大小写匹配电影名（避免大小写错误）
            const targetMovie = moviesData.find(m => 
                m.title && m.title.toLowerCase() === movieName.toLowerCase()
            );

            if (targetMovie) {
                fillMovieData(targetMovie);
            } else {
                document.getElementById('movie-name').textContent = `电影 "${movieName}" 未找到`;
            }
        })
        .catch(error => {
            console.error('错误：', error);
            document.getElementById('movie-name').textContent = '数据加载失败';
        });
});