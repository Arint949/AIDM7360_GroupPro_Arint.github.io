document.addEventListener('DOMContentLoaded', function() {
    // ===================== 导航菜单动态效果 =====================
    const searchContainer = document.querySelector('.search-container');
    const searchDropdown = document.getElementById('search-dropdown');
    const settingContainer = document.querySelector('.setting-container');
    const settingDropdown = document.getElementById('setting-dropdown');
    const directorInput = document.getElementById('movie-input'); // 输入框 ID 为 'movie-input'

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

    // ===================== 导演搜索功能 =====================
    let moviesData = [];

    // 1. 加载电影数据
    fetch('../../movies_data.json')
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
            console.error('加载 JSON 失败:', error);
        });

    // 2. 监听输入框回车事件
    directorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const inputDirectorName = this.value.trim();
            if (!inputDirectorName) {
                alert("请输入导演名！");
                return;
            }

            if (moviesData.length === 0) {
                console.log("电影数据加载中，请稍候");
                return;
            }

            // 3. 查找包含该导演的电影 (模糊搜索)
            const moviesByDirector = moviesData.filter(movie => {
                return movie.directors && movie.directors.toLowerCase().includes(inputDirectorName.toLowerCase());
            });

            // 4. 处理搜索结果
            if (moviesByDirector.length > 0) {
                // 跳转到导演详情页，并传递导演名作为参数
                const encodedDirectorName = encodeURIComponent(inputDirectorName);
                window.location.href = `../../detail/director_detail/director_detail.html?director=${encodedDirectorName}`;
            } else {
                alert(`未找到导演 "${inputDirectorName}" 执导的电影，请重新输入！`);
                this.value = '';
            }
        }
    });
});