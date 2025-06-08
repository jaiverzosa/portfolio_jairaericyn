const showSidebar = document.getElementById('button_sidebar');
const closeSidebar = document.getElementById('button_closeSidebar');
const sidebar = document.getElementById('sidebarContent')

showSidebar.addEventListener('click', function(){
    sidebar.classList.toggle('show');
})

closeSidebar.addEventListener('click', function(){
    sidebar.classList.remove('show');
})