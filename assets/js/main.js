$('.dropdown').on('click', function(e) {
    var target = $(e.target);
    var dropdown = target.closest('.dropdown');
    return !dropdown.hasClass('open') || !target.hasClass('dropdown-menu__search__input');
});