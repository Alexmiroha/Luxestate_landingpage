function slowScroll(id) {
    var offset = 0;
    $('html, boby').animate({
        scrollTop: $(id).offset().top - offset
    }, 500);
    return false;
}