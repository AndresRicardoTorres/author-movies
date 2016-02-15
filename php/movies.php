<?php
require 'controller.php';

$id = $_GET['actorId'];
$movies = array();
if($id) {
  $movies = Controller::movies($id);
}
echo json_encode($movies);
