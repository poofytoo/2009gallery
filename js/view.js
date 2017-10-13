var sections = {
    'team' : 1,
    '3-ideas' : 2,
    'sketch-models' : 3,
    'mock-ups' : 4
}

var scrollBreaks = [];

function updateNavigationBar() {
    if ($(window).scrollTop() < 10) {
        $('.navigation').removeClass('condensed');
        $('h1').removeClass('condensed');
        $('h2').removeClass('condensed');
    } else {
        $('.navigation').addClass('condensed');
        $('h1').addClass('condensed');
        $('h2').addClass('condensed');
    }
}

function updateSidemenuHighlight() {
    var closestSection = 0;
    var section = 'team';
    var scrollTop = $(window).scrollTop();
    var offset = 200
    for (i in sections) {
        if (sections[i] < scrollTop + offset && closestSection < sections[i]) {
            closestSection = sections[i] ;
            section = i;
        }
    }
    $('h3').each(function() {
        $('li').removeClass('sidemenu-highlight')
    })
    $('li.m-' + section).addClass('sidemenu-highlight')
}

function scrollToSection(section) {
    $(window).scrollTo($('h3.' + section), {
        offset: -50,
        duration: 200
    })
    updateSidemenuHighlight();
}

function buildSidemenu() {
    $('h3').each(function() {
        sections[$(this).attr('class')] = $(this).offset().top;
    })
    $('.project-sidemenu').on('click', 'li', function () {
        scrollToSection($(this).data('section'));
    })
}

$(function () {
    $(window).scroll(function () {
        updateSidemenuHighlight();
        updateNavigationBar();
    });

    updateNavigationBar();
    buildSidemenu();

    locationHash = window.location.hash;
    if (locationHash) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        scrollToSection(locationHash.replace(/[^\-A-Za-z0-9]/g, ''));
    }
})