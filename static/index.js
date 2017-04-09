function reposition() {
    // $('div').removeClass('hidden');
    let offset = $('.background-anchor').position();
    let width = $('.background-anchor').width();
    let height = $('.background-anchor').height();
    $('.background-anchored')
        .each(function() {
            // Reset width/height.
            $(this).css('width', width * $(this).attr('w'));
            $(this).css('height', width * $(this).attr('h'));

            let x = (width * $(this).attr('off-x'));
            let y = (height * $(this).attr('off-y'));
            $(this).css('left', offset.left + x);
            $(this).css('top', offset.top + y);

            // Make the image stop at the edge.
            if (x + $(this).width() / 2 > width) {
                $(this).css('width', 2 * (width - x));
            } else if (x - $(this).width() / 2 < 0) {
                $(this).css('width', 2 * x);
            }
            if (y + $(this).height() > height) {
                $(this).css('height', 2 * (height - y));
            } else if (y - $(this).height() / 2 < 0) {
                $(this).css('height', 2 * y);
            }

            // Center on the point.
            $(this).css('margin-left', -0.5 * $(this).width());
            $(this).css('margin-top', -0.5 * $(this).height());
        });

    if ($('#states').length) {
        offset = $('#states').position();
        height = $('#states').height();
        width = $('#states').width();

        // Center the states vertically.
        if (offset.top + height < $('#map').height()) {
            /*
            $('#states').css('top', ($('#map').height() - height) / 2);
            $('#states').css('margin', 0);
            */
        } else {
            /*
            $('#states').css('top', 0);
            $('#states').css('margin', '1%');
            */
        }
        offset = $('#states').position();

        $('.states-anchored')
            .each(function() {
                let localWidth = $(this).width();
                let localHeight = $(this).height();
                let x = offset.left + (width * $(this).attr('x'));
                let y = offset.top + (height * $(this).attr('y'));
                $(this).css('left', x);
                $(this).css('top', y);

                // Center on the point.
                $(this).css('margin-left', -0.5 * localWidth);
                $(this).css('margin-top', -0.5 * localHeight);
            });

        offset = $('#map').position();
        width = $('#map').width();
        height = $('#map').height();
        $('.map-anchored')
            .each(function() {
                let localWidth = $(this).width();
                let localHeight = $(this).height();
                let x = offset.left + (width * $(this).attr('off-x'));
                let y = offset.top + (height * $(this).attr('off-y'));
                $(this).css('left', x);
                $(this).css('top', y);

                // Center on the point.
                $(this).css('margin-left', -0.5 * localWidth);
                $(this).css('margin-top', -0.5 * localHeight);
            });
    }
}
function highlightIcon(iconId) {
    iconId = '#' + iconId;
    $(iconId).width($(iconId).width() + 20);
    $(iconId).height($(iconId).height() + 20);
    $(iconId).addClass('highlighted');
    let menuId = iconId + '-li';
    $(menuId).addClass('underlined');
    reposition();
}
function unhighlightIcon(iconId) {
    iconId = '#' + iconId;
    $(iconId).width($(iconId).width() - 20);
    $(iconId).height($(iconId).height() - 20);
    $(iconId).removeClass('highlighted');
    let menuId = iconId + '-li';
    $(menuId).removeClass('underlined');
    reposition();
}
$(window).resize(reposition);
$(function() {
    setTimeout(reposition, 20);
    $('.menu-item')
        .hover(
            function() {
                let id = $(this).attr('id');
                highlightIcon(id.substr(0, id.indexOf('-')));
            },
            function() {
                let id = $(this).attr('id');
                unhighlightIcon(id.substr(0, id.indexOf('-')));
            });

    $('.states-anchored')
        .hover(
            function() {
                highlightIcon($(this).attr('id'));
            },
            function() {
                unhighlightIcon($(this).attr('id'));
            });

    $('#bridal-li')
        .hover(
            function() {
                $('.states-anchored').addClass('hidden');
                $('.bridal-party').removeClass('hidden');
            },
            function() {
                $('.states-anchored').removeClass('hidden');
                $('.bridal-party').addClass('hidden');
            });
});
