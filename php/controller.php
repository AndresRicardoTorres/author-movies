<?php
require '../vendor/autoload.php';
/**
 *
 */
class Controller
{
  private static $key = '88b2272ca6b0b8c11a0b4085fd145446';

  static private function init() {
    $token  = new \Tmdb\ApiToken(self::$key);
    $client = new \Tmdb\Client($token);
    $configRepository = new \Tmdb\Repository\ConfigurationRepository($client);
    $config = $configRepository->load();
    $imageHelper = new \Tmdb\Helper\ImageHelper($config);
    return array($client, $imageHelper);
  }

  static public function persons($query) {
    list($client, $imageHelper) = self::init();
    $data = $client->getSearchApi()->searchPersons($query, array('page' => 1));

    $persons = array();
    foreach ($data['results'] as &$result) {
      $result['photo_url'] = 'assets/images/nobody.png';
      if(!is_null($result['profile_path'])) {
        $result['photo_url'] = $imageHelper->getUrl($result['profile_path'], 'w154');
      }
      $persons[] = $result;
    }
    return $persons;
  }

  static public function movies($idPerson) {
    list($client, $imageHelper) = self::init();
    $movies = array();
    $data = $client->getPeopleApi()->getMovieCredits($idPerson);
    // Only acting
    $data = $data['cast'];

    // Sort by date
    usort($data, function($a, $b) {
      return strcmp($b['release_date'], $a['release_date']);
    });

    foreach ($data as &$result) {
      if(!is_null($result['poster_path'])) {
        $result['photo_url'] = $imageHelper->getUrl($result['poster_path'], 'w154');
      }
      $movies[] = $result;
    }

    return $movies;
  }
}
