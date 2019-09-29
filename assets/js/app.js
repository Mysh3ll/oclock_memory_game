// Importation de la feuille de style scss
import '../scss/app.scss';

// Chargement du package jquery depuis le répertoir node_modules
import $ from 'jquery';

// Chargement du package bootstrap depuis le répertoire node_modules
import bootstrap from "bootstrap";

// Exécuter quand le document est ready
$(document).ready(function () {

    // Notre application avec toutes ses métohdes
    const app = {
        cardValues: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014],
        startTime: 0,
        timeout: 0,

        // Initiation de notre application
        init: () => {
            // On mélange les cartes
            app.shuffleCards();
            // On lance le jeu
            app.startGame();
        },
        startGame: () => {
            $('.container').show();
            // Affichage de la barre de progression
            app.progressBar(300, 300, $('#progress-bar'));
            // Gestion des clicks sur les cartes
            app.clickHandlerCard();
            // Lancement du temps d'origine pour le chronomètre
            app.startTime = new Date();
        },
        clickHandlerCard: () => {
            // Gestion du click sur une carte
            $('.card').on('click', function () {
                // On fait tourner la carte sélectionnée
                app.flipCard($(this));
            });
        },
        shuffleCards: () => {
            // Mélange le tableau "cardValues"
            app.cardValues.sort(() => Math.random() - 0.5);
            // Ajoute les div de cartes dans la div container
            app.cardValues.forEach(() => $('.container').append('<div class="card unselected"></div>'));
            // Ajoute l'attribut data-card à chaque carte
            $('.card').each(function (index) {
                $(this).attr('data-card', app.cardValues[index]);
            });
        },
        flipCard: (card) => {
            // Ajoute la classe 'selected' à la carte sélectionnée
            card.addClass('selected');
            // Affiche une image quand la carte est retournée
            card.css({'background-image': 'url("https://picsum.photos/id/' + card.data('card') + '/113/150")'});
            // Lorsque deux cartes sont sélectionnées
            if ($('.selected').length === 2) {
                // Vérification de la correspondance entre les deux cartes
                app.checkMatchCards();
            }
        },
        checkMatchCards: () => {
            // Création d'une constante pour éviter la répétition dans le code
            const selected = $('.selected');
            // Si les deux cartes sont identiques on les efface
            if (selected.first().data('card') === selected.last().data('card')) {
                // On lance l'animation d'effacement
                setTimeout(() => {
                    $('.selected').each(function () {
                        $(this).removeClass('unselected selected').css({'background': ''}).animate({opacity: 0}, {duration: 1000});
                        // On contrôle si on a fini le jeu
                        app.checkWinGame();
                    });
                }, 1000);
            } else {
                // Si les deux cartes sont différentes on les retourne
                setTimeout(() => {
                    $('.selected').each(function () {
                        $(this).removeClass('selected').css({'background': ''});
                    });
                }, 800);
            }
        },
        checkWinGame: () => {
            // On verifie s'il ne reste plus de carte dans le jeu
            if ($('.unselected').length === 0) {
                // Création d'une constante pour le chronomètre de fin de jeu
                const endTime = new Date();
                // Calcul entre le début et la fin en secondes
                const time = Math.round((endTime - app.startTime) / 1000);
                // Affichage de la fenêtre de fin de jeu
                app.endGame('Hey Good Job ! Tu as gagné en ' + time + ' secondes', true, time);
            }
        },
        progressBar: (timeleft, timetotal, $element) => {
            // Gestion de l'affichage de la barre de progression
            const progressBarWidth = timeleft * $element.width() / timetotal;
            $element.find('div').animate({width: progressBarWidth}, 500).html(Math.floor(timeleft / 60) + ":" + timeleft % 60);
            if (timeleft >= 0) {
                app.timeout = setTimeout(() => {
                    if (timeleft !== 0) {
                        app.progressBar(timeleft - 1, timetotal, $element);
                    } else {
                        // Le temps est écoulé, retour au début du jeu
                        app.endGame('Allez retente ta chance !!!', false);
                    }
                }, 1000);
            }
        },
        endGame: (text, win, time = 0) => {
            // Blocage de la barre de progression
            clearTimeout(app.timeout);
            // Affichage de la fenêtre de fin de jeu
            $('.end-game').css('display', 'flex');
            $('.end-game p').text(text);
            // On relance la partie
            $('#end-game').on('click', () => {
                // Si on a fini le jeu on sauvegarde le temps en base de données via une requête ajax
                if (win) {
                    app.saveScoreToDatabase(time);
                } else {
                    // Ou sinon on recharge la page
                    location.reload();
                }
            });
        },
        saveScoreToDatabase: (time) => {
            // Récupération du path afin d'effectuer la requête ajax
            const path = $('#save-score').data('path').replace(/.$/, time);
            // Exécution de la requête ajax
            $.ajax({
                url: path,
                type: 'post',
                success: ({message, error}) => {
                    if (!error) {
                        console.log(message);
                        location.reload();
                    } else if (error) {
                        console.log(message);
                    }
                },
                error: () => console.log('error')
            });
        },
    };

    // Start Game
    $('#start-game').on('click', () => {
        // On cache l'affichage des scores
        $('.top-scores').hide();
        // On lance l'application
        app.init();
    });
});
