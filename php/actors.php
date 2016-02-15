<?php
require 'controller.php';

$query = $_GET['actorName'];
$persons = array();
if($query) {
  $persons = Controller::persons($query);
}
echo json_encode($persons);
