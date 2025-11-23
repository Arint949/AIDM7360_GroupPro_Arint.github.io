document.addEventListener('DOMContentLoaded', function() {
    // ===================== 导航菜单动态效果 =====================
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

    // ===================== 导演详情功能 =====================

    // 1. 从URL获取导演名
    function getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = window.location.search.substr(1).match(reg);
        return r ? decodeURIComponent(r[2]) : null;
    }
    const directorName = getUrlParam('director');

    if (!directorName) {
        document.getElementById('director-intro').textContent = "未指定要查询的导演！";
        return;
    }

    // 2. 加载并处理数据
    fetch('../../movies_data.json')
        .then(response => {
            if (!response.ok) throw new Error('无法加载电影数据');
            return response.json();
        })
        .then(moviesData => {
            // 筛选出该导演的电影
            const moviesByDirector = moviesData.filter(movie => {
                return movie.directors && movie.directors.toLowerCase().includes(directorName.toLowerCase());
            });

            if (moviesByDirector.length === 0) {
                document.getElementById('director-intro').textContent = `未找到导演 "${directorName}" 的相关信息。`;
                return;
            }

            // --- 计算统计数据 ---
            const movieCount = moviesByDirector.length;
            
            // 评分数据
            const validRatings = moviesByDirector
                .map(m => m.rating)
                .filter(r => r !== null && r !== undefined && !isNaN(r));
            
            const avgRating = validRatings.length > 0 
                ? (validRatings.reduce((sum, r) => sum + parseFloat(r), 0) / validRatings.length).toFixed(1) 
                : 'N/A';

            // 最高/最低评分电影
            let bestMovie = null, worstMovie = null;
            if (validRatings.length > 0) {
                bestMovie = moviesByDirector.reduce((prev, curr) => 
                    (parseFloat(prev.rating) > parseFloat(curr.rating)) ? prev : curr
                );
                worstMovie = moviesByDirector.reduce((prev, curr) => 
                    (parseFloat(prev.rating) < parseFloat(curr.rating)) ? prev : curr
                );
            }

            // 总票房
            const totalGross = moviesByDirector
                .map(m => m.total_gross_worldwide || 0)
                .reduce((sum, gross) => sum + parseFloat(gross), 0);
            
            // --- 填充页面内容 ---
            document.getElementById('director-intro').textContent = `${directorName} directed ${movieCount} movies.`;
            document.getElementById('best-movie').innerHTML = `Best-rated movie: <strong>${bestMovie ? bestMovie.title : 'N/A'}</strong> (score ${bestMovie ? bestMovie.rating : 'N/A'}).`;
            document.getElementById('worst-movie').innerHTML = `Lowest-rated movie: <strong>${worstMovie ? worstMovie.title : 'N/A'}</strong> (score ${worstMovie ? worstMovie.rating : 'N/A'}).`;
            document.getElementById('avg-rating').innerHTML = `Average rating: <strong>${avgRating}</strong>`;
            document.getElementById('total-gross').innerHTML = `Total worldwide gross across all movies: <strong>$${totalGross.toLocaleString()}</strong>`;

        })
        .catch(error => {
            console.error('加载导演详情失败:', error);
            document.getElementById('director-intro').textContent = "数据加载失败。";
        });
});