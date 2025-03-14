/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

function openEvent(url) {
    window.open(url, '_blank');
}


function makeAnimation(object, down, height, pixels) {

    var id = setInterval(down === true ? slideDown : slideUp , 10);

    function slideDown() {
        if (object.clientHeight >= height) {
            clearInterval(id);
        }
        else {
            object.style.height = object.clientHeight + pixels++ + 'px';
        }
    }

    function slideUp() {
        if ((object.clientHeight - 30) <= height) {
            object.style.height = height + 'px';
            clearInterval(id);
        }
        else {
            object.style.height = object.clientHeight - pixels++ + 'px';
        }
    }
}


function toggleChannels(object, show, hide) {
    try {
        var $row = $(object).parent().parent().prev();

        if ($row.hasClass('open')) {
            $row.animate({height: 100}, {queue: true, duration: 200});
            $row.removeClass('open');
            $(object).html(show);
        }
        else {
            $row.animate({height: $row.prop('scrollHeight')}, {queue:false, duration: 200});
            $row.addClass('open');
            $(object).html(hide);
        }
    }
    catch (e) {
        var row = object.parentNode.parentNode.previousElementSibling;

        if (row.classList.contains('open')) {
            makeAnimation(row, false, 100, 3);
            row.classList.remove('open');
            object.text = show;
        }
        else {
            makeAnimation(row, true, row.scrollHeight, 3);
            row.classList.add('open');
            object.text = hide;
        }
    }
};

function toggleText(code, object) {
    try {
        var $row = $('.text-' + code);

        var $text = $row.children();

        var $object = $(object);

        if ($object.hasClass('open')) {
            $object.children().text('+');
            $object.removeClass('open')
        }
        else {
            $object.children().text('-');
            $object.addClass('open')
        }


        if ($text.hasClass('open')) {
            $text.css({'display' : '-webkit-box'});
            $text.animate({height : 1.2*14*2, display : '-webkit-box'}, {queue: true, duration: 500});
            $text.removeClass('open');
        }
        else {
            $text.css({'display' : 'block'});
            $text.animate({height : $text.prop('scrollHeight')}, {queue: false, duration: 500});
            $text.addClass('open');
        }

        $row = $('.channels-' + code);

        if ($row.hasClass('open')) {
            $row.animate({height: 100}, {queue: true, duration: 500});
            $row.removeClass('open');
        }
        else {
            $row.animate({height: $row.prop('scrollHeight')}, {queue:false, duration: 500});
            $row.addClass('open');
        }
    }
    catch (e) {
        var row = document.getElementsByClassName('text-' + code)[0];

        var text = row.childNodes[1];

        if (object.classList.contains('open')) {
            object.childNodes[0].textContent = '+';
            object.classList.remove('open');
        }
        else {
            object.childNodes[0].textContent = '-';
            object.classList.add('open');
        }

        if (row.classList.contains('open')) {
            text.style.display = '-webkit-box';
            makeAnimation(text, false, 1.2*14*2, 2);
            row.classList.remove('open');
        }
        else {
            text.style.display = 'block';
            makeAnimation(text, true, text.scrollHeight, 2);
            row.classList.add('open');
        }

        row = document.getElementsByClassName('channels-' + code)[0];

        if (row.classList.contains('open')) {
            makeAnimation(row, false, 100, 3);
            row.classList.remove('open');
        }
        else {
            makeAnimation(row, true, row.scrollHeight, 3);
            row.classList.add('open');
        }
    }

}

function resizeContent(){

    try {
        var $width = $('.snippet').get(0).clientWidth;

        $('.snippet .snippet-container-fluid').removeClass('xxl');
        $('.snippet .snippet-container-fluid').removeClass('xl');
        $('.snippet .snippet-container-fluid').removeClass('lg');
        $('.snippet .snippet-container-fluid').removeClass('md');
        $('.snippet .snippet-container-fluid').removeClass('sm');
        $('.snippet .snippet-container-fluid').removeClass('xs');
        $('.snippet .snippet-container-fluid').removeClass('xxs');


        if ($width >= 1850) {
            $('.snippet .snippet-container-fluid').addClass('xxl');
        }

        if ($width >= 1500) {
            $('.snippet .snippet-container-fluid').addClass('xl');
        }

        if ($width >= 1200) {
            $('.snippet .snippet-container-fluid').addClass('lg');
        }
        else if ($width >= 992) {
            $('.snippet .snippet-container-fluid').addClass('md');
        }
        else if ($width >= 768) {
            $('.snippet .snippet-container-fluid').addClass('sm');
        }
        else {
            $('.snippet .snippet-container-fluid').addClass('xs');

            if ($width < 550) {
                $('.snippet .snippet-container-fluid').addClass('xxs');
            }
        }

        $('.channels').each(function() {
            if ($(this).height() === $(this).prop('scrollHeight')) {
                $(this).next().css({'visibility': 'hidden'});
            }
        });
    }
    catch (e) {
        var width = document.getElementsByClassName('snippet')[0].clientWidth;

        var classes = document.getElementsByClassName('snippet-container-fluid');

        var index = 0;
        var classesLength = classes.length;

        for (index = 0; index < classesLength; index++) {
            classes[index].classList.remove('xl', 'lg', 'md', 'sm', 'xs', 'xxs');
        }

        if (width >= 1850) {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('xxl');
            }
        }

        if (width >= 1500) {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('xl');
            }
        }

        if (width >= 1200) {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('lg');
            }
        }
        else if (width >= 992) {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('md');
            }
        }
        else if (width >= 768) {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('sm');
            }
        }
        else {
            for (index = 0; index < classesLength; index++) {
                classes[index].classList.add('xs');
            }

            if (width < 550) {
                for (index = 0; index < classesLength; index++) {
                    classes[index].classList.add('xxs');
                }
            }
        }

        var channels = document.getElementsByClassName('channels');

        var channel;

        for (index = 0; index < channels.length; index++) {
            channel = channels[index];
            if (channel.clientHeight === channel.scrollHeight) {
                channel.nextElementSibling.style.visibility = 'hidden';
            }
        }
    }
}

// change window size
var resizeListener = (function() {

    var functions = new Array();

    function callFunctions() {
        functions.forEach(function(callback) {
            callback();
        });
    }

    var doit;

    window.onresize = function(){
        clearTimeout(doit);
        doit = setTimeout(callFunctions, 250);
    };

    return {

        addFunction: function(func) {
            functions.push(func);
        }

    };

})();

resizeListener.addFunction(resizeContent);

// dom ready
try {
    $(function() {
        resizeContent();
    });
}
catch(e) {

    document.addEventListener("DOMContentLoaded", function(event) {
        resizeContent();
    });

    console.log('Plugin SledovaniTV - jQuery not found.');
}