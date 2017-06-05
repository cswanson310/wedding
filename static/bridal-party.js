$(function() {
    let nFrames = $('.group-shot').length;
    let activeFrame = 0;
    let loop = true;
    function nextFrame() {
        return (activeFrame + 1) % nFrames;
    }
    function prevFrame() {
        return (activeFrame + nFrames - 1) % nFrames;
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
            setTimeout(renderLoop, 4000);
        }
    }
    setTimeout(renderLoop, 3000);
    $('#group-shots')
        .on('click', function(e) {
            let direction, next;
            if (e.originalEvent.offsetX > ($('#group-shots').width() / 2)) {
                direction = 'right';
                next = nextFrame();
            } else {
                direction = 'left';
                next = prevFrame();
            }
            loop = false;
            render(activeFrame, next, 500, direction);
        });
    $('.group-selector-elem')
        .on('click', function() {
            loop = false;
            let nextFrame = Number($(this).attr('group-num'));
            if (nextFrame != activeFrame) {
                let direction = nextFrame < activeFrame ? 'left' : 'right';
                render(activeFrame, nextFrame, 500, direction);
            }
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
    $('#bridal-li').addClass('active-page');
});
