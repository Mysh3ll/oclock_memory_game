<?php

namespace App\Controller;

use App\Repository\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/", name="game_home")
     * @param ScoreRepository $scoreRepository
     * @return Response
     */
    public function home(ScoreRepository $scoreRepository)
    {
        // Récupération des 5 meilleurs scores
        $scores = $scoreRepository->findBy([], ['score' => 'ASC'],5);

        /* Affichage de la page templates/game/index.html.twig
         * avec les meilleurs scores
         */
        return $this->render('game/index.html.twig', [
            'scores' => $scores,
        ]);
    }
}
