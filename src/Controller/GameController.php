<?php

namespace App\Controller;

use App\Entity\Score;
use App\Repository\ScoreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(path="/", name="game_")
 */
class GameController extends AbstractController
{
    /**
     * @Route("", name="home")
     * @param ScoreRepository $scoreRepository
     * @return Response
     */
    public function home(ScoreRepository $scoreRepository)
    {
        // Récupération des 5 meilleurs scores
        $scores = $scoreRepository->findBy([], ['score' => 'ASC'], 5);

        /* Affichage de la page templates/game/index.html.twig
         * avec les meilleurs scores
         */
        return $this->render('game/index.html.twig', [
            'scores' => $scores,
        ]);
    }

    /**
     * @Route("save-score/{timeInSeconds}", name="save_score", requirements={"timeInSeconds"="\d+"})
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param int $timeInSeconds
     * @return JsonResponse
     */
    public function saveScore(Request $request, EntityManagerInterface $em, int $timeInSeconds)
    {
        if ($request->isXmlHttpRequest()) {

            $score = new Score();
            $score->setScore($timeInSeconds);

            $em->persist($score);
            $em->flush();

            $result['message'] = 'Score sauvegardé';
            return $this->json($result);

        }
        $result['message'] = 'Une erreur s\'est produite';
        return $this->json($result);
    }
}
