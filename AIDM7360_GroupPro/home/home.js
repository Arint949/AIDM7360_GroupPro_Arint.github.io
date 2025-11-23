// 确保 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const searchContainer = document.getElementById('searchContainer');
    const searchDropdown = document.getElementById('search-dropdown');
    const settingContainer = document.getElementById('settingContainer');
    const settingDropdown = document.getElementById('setting-dropdown');

    // 初始状态：确保两个气泡都是关闭的
    searchDropdown.style.display = 'none';
    settingDropdown.style.display = 'none';

    // 搜索容器点击事件
    searchContainer.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        // 切换搜索气泡的显示状态
        const isOpen = searchDropdown.style.display === 'flex';
        // 关闭设置气泡
        settingDropdown.style.display = 'none';
        // 切换当前气泡
        searchDropdown.style.display = isOpen ? 'none' : 'flex';
    });

    // 设置容器点击事件
    settingContainer.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        // 切换设置气泡的显示状态
        const isOpen = settingDropdown.style.display === 'flex';
        // 关闭搜索气泡
        searchDropdown.style.display = 'none';
        // 切换当前气泡
        settingDropdown.style.display = isOpen ? 'none' : 'flex';
    });

    // 点击页面其他地方关闭所有气泡
    document.addEventListener('click', function() {
        searchDropdown.style.display = 'none';
        settingDropdown.style.display = 'none';
    });

    // 点击气泡内部时不关闭
    searchDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    settingDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});