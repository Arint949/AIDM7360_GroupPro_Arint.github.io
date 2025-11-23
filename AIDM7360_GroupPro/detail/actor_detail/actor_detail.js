document.addEventListener('DOMContentLoaded', function() {
    // ===================== 导航菜单动态效果 (与query1.js完全相同) =====================
    const searchContainer = document.querySelector('.search-container');
    const searchDropdown = document.getElementById('search-dropdown');
    const settingContainer = document.querySelector('.setting-container');
    const settingDropdown = document.getElementById('setting-dropdown');
    const actorInput = document.getElementById('movie-input'); // 注意：这里id仍是'movie-input'，但功能是搜索演员

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

    // ===================== 演员搜索功能 =====================
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
    actorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const inputActorName = this.value.trim();
            if (!inputActorName) {
                alert("请输入演员名！");
                return;
            }

            if (moviesData.length === 0) {
                console.log("电影数据加载中，请稍候");
                return;
            }

            // 3. 在所有电影数据中查找包含该演员的电影
            // 注意：我们假设演员名单在 'stars' 字段中，并且是逗号分隔的字符串
            const moviesWithActor = moviesData.filter(movie => {
                // 检查 'stars' 字段是否存在且包含输入的演员名（不区分大小写）
                return movie.stars && movie.stars.toLowerCase().includes(inputActorName.toLowerCase());
            });

            // 4. 处理搜索结果
            if (moviesWithActor.length > 0) {
                // 找到匹配的电影，跳转到演员详情页，并将演员名通过URL参数传递过去
                const encodedActorName = encodeURIComponent(inputActorName);
                window.location.href = `../../detail/actor_detail/actor_detail.html?actor=${encodedActorName}`;
            } else {
                alert(`未找到演员 "${inputActorName}" 出演的电影，请重新输入！`);
                this.value = '';
            }
        }
    });
});