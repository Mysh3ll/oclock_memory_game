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
     * Controller pour la page d'accueil du jeu
     *
     * @Route("", name="home")
     * @param ScoreRepository $scoreRepository
     * @return Response
     */
    public function home(ScoreRepository $scoreRepository)
    {
        // Récupération des 5 meilleurs scores
        $scores = $scoreRepository->findBy([], ['score' => 'ASC'], 5);

        // Affichage de la page templates/game/index.html.twig avec les meilleurs scores
        return $this->render('game/index.html.twig', [
            'scores' => $scores,
        ]);
    }

    /**
     * Controller qui permet de gérer la requête ajax depuis le javascript
     * pour sauvegarder le score en base de données
     *
     * @Route("save-score/{timeInSeconds}", name="save_score", methods={"POST"}, requirements={"timeInSeconds"="\d+"})
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param int $timeInSeconds
     * @return JsonResponse
     */
    public function saveScore(Request $request, EntityManagerInterface $em, int $timeInSeconds)
    {
        // On vérifie si la requête correspond à de l'ajax
        if ($request->isXmlHttpRequest()) {

            // Création de l'obejt Score
            $score = new Score();
            // Attribution du temps
            $score->setScore($timeInSeconds);

            // On persist l'objet
            $em->persist($score);
            // On sauve en base de données
            $em->flush();

            // On renvoie une réponse en json pour la requête ajax
            $result['message'] = 'Score sauvegardé';
            return $this->json($result);

        }

        // On renvoie une réponse en json pour la requête ajax
        $result['message'] = 'Une erreur s\'est produite';
        return $this->json($result);
    }
}
