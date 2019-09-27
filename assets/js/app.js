/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
import '../scss/app.scss';

// loads the jquery package from node_modules
import $ from 'jquery';

// loads the bootstrap package from node_modules
import bootstrap from "bootstrap";

// Exécuter quand le document est ready
$(document).ready(function () {

    const app = {
        cardValues: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014],
        startTime: 0,

        init: () => {
            app.shuffleCards();
            app.startGame();
        },
        startGame: () => {
            app.clickHandlerCard();
            app.startTime = new Date();
            console.log(app.startTime);
        },
        clickHandlerCard: () => {
            $('.card').on('click', function () {
                app.flipCard($(this));
            });
        },
        shuffleCards: () => {
            // mélange le tableau
            app.cardValues.sort(() => Math.random() - 0.5);
            // ajoute les div de cartes
            app.cardValues.forEach(() => $('.container').append('<div class="card unselected"></div>'));
            // ajoute l'attribut data-card
            $('.card').each(function (index) {
                $(this).attr('data-card', app.cardValues[index]);
            });
        },
        flipCard: (card) => {
            card.addClass('selected');
            card.css({'background-image': 'url("https://picsum.photos/id/' + card.data('card') + '/113/150")'});
            if ($('.selected').length === 2) {
                app.checkMatchCards();
            }
        },
        checkMatchCards: () => {
            const selected = $('.selected');
            if (selected.first().data('card') === selected.last().data('card')) {
                setTimeout(() => {
                    $('.selected').each(function () {
                        $(this).removeClass('unselected selected').css({'background': ''}).animate({opacity: 0}, {duration: 1000});
                        app.checkWinGame();
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    $('.selected').each(function () {
                        $(this).removeClass('selected').css({'background': ''});
                    });
                }, 800);
            }
        },
        checkWinGame: () => {
            if ($('.unselected').length === 0) {
                $('.results').show();
                const endTime = new Date();
                const time = Math.round((endTime - app.startTime) / 1000);
                console.log('Tu as gagné en ' + time + ' seconds');
            }
        },
    };

    const progress=(timeleft, timetotal, $element) => {
        const progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find('div').animate({width: progressBarWidth}, 500).html(Math.floor(timeleft / 60) + ":" + timeleft % 60);
        if (timeleft >= 0) {
            setTimeout(() => {
                if (timeleft !== 0) {
                    progress(timeleft - 1, timetotal, $element);
                } else {
                    alert('fin');
                }
            }, 1000);
        }
    };

    app.init();
    progress(300, 300, $('#progressBar'));
});
