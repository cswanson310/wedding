$(function() {
    let nFrames = $('.group-shot').length;
    let activeFrame = 0;
    let loop = true;
    function nextFrame() {
        return (activeFrame + 1) % nFrames;
    }
    function render(currentFrame, nextFrame, timeout, direction) {
        timeout = timeout || 900;
        direction = direction || 'right';
        let current = '#group-' + currentFrame;
        let next = '#group-' + nextFrame;
        $(current).css('left', $(current).position().left);
        if (direction == 'left') {
            $(current)
                .animate({'left': '100%'}, timeout, 'swing', function() {
                    $(this).addClass('hidden');
                });
            $(next).css('left', '-100%');
            $(next).removeClass('hidden');
            $(next).animate({'left': 0}, timeout);
        } else {
            $(current)
                .animate({'left': '-100%'}, timeout, 'swing', function() {
                    $(this).addClass('hidden');
                });
            $(next).css('left', '100%');
            $(next).removeClass('hidden');
            $(next).animate({'left': 0}, timeout);
        }
        $(current + '-li').removeClass('active');
        $(next + '-li').addClass('active');
        activeFrame = nextFrame;
    }
    function renderLoop() {
        if (loop) {
            render(activeFrame, nextFrame());
            setTimeout(renderLoop, 3000);
        }
    }
    setTimeout(renderLoop, 3000);
    $('.group-selector-elem')
        .on('click', function() {
            loop = false;
            let nextFrame = Number($(this).attr('group-num'));
            let direction = nextFrame < activeFrame ? 'left' : 'right';
            render(activeFrame, nextFrame, 500, direction);
        });
    $(document)
        .on('keydown', function(event) {
            loop = false;
            if (event.which == 37) {
                let nextFrameNum = activeFrame - 1;
                if (nextFrameNum < 0) {
                    nextFrameNum = nFrames - 1;
                }
                render(activeFrame, nextFrameNum, 300, 'left');
            } else if (event.which == 39 || event.which == 32) {
                render(activeFrame, nextFrame(), 300);
            }
        });
    function resetActive() {
        $('.menu-selector').removeClass('active-section');
        let sectionTop = Math.floor($('#sections').offset().top);
        if (sectionTop < Math.floor($('#bridesmaids').offset().top)) {
            $('#group-link').addClass('active-section');
        } else if (sectionTop < Math.floor($('#groomsmen').offset().top)) {
            $('#bridesmaids-link').addClass('active-section');
        } else {
            $('#groomsman-link').addClass('active-section');
        }
    }
    $('#group-link')
        .on('click', function() {
            $('#sections').animate({scrollTop: 0}, 500, resetActive);
        });
    $('#bridesmaids-link')
        .on('click', function() {
            $('#sections')
                .animate({
                    scrollTop:
                        Math.ceil(($('#bridesmaids').position().top + $('#sections').scrollTop()) -
                                  $('#sections').position().top)
                },
                         500,
                         resetActive);
        });
    $('#groomsman-link')
        .on('click', function() {
            $('#sections')
                .animate({
                    scrollTop:
                        Math.ceil(($('#groomsmen').position().top + $('#sections').scrollTop()) -
                                  $('#sections').position().top)
                },
                         500,
                         resetActive);
        });
    $('#sections')
        .on('scroll', function() {
            resetActive();
        });
    $('#bridal-li').addClass('active-page');
});
