$(function() {
    function resetActive() {
        $('#page-menu li').removeClass('active-section');
        let sectionsTop = $('#sections').offset().top + ($('#sections').height() / 2);
        let sectionId = 1;
        for (; $('#section-link-' + sectionId).length > 0; ++sectionId) {
            let sectionTop = $('#section-' + sectionId).offset().top;
            if (sectionTop >= sectionsTop) {
                break;
            }
        }
        $('#section-link-' + Math.max(1, (sectionId - 1))).addClass('active-section');
    }
    for (let sectionId = 1; $('#section-link-' + sectionId).length > 0; ++sectionId) {
        $('#section-link-' + sectionId)
            .on('click', function() {
                let newTop = Math.ceil(
                    ($('#section-' + sectionId).position().top + $('#sections').scrollTop()) -
                    $('#sections').position().top);
                $('#sections').animate({scrollTop: newTop}, 500, resetActive);
            });
    }
    $('#sections')
        .on('scroll', function() {
            resetActive();
        });
    setTimeout(resetActive, 20);
    setTimeout(resetActive, 200);  // Make sure this runs.
});
