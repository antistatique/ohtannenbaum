<?php
require_once(dirname(__FILE__).'/lib/Swift/lib/swift_required.php');

$jsonPost = $_GET['json'];
$result = json_decode($jsonPost);

$members = $result->members;
$owner = $result->owner;
$circle = $result->circle;

$sortedMembers = array();

foreach($members as $member){
  $sortedMembers[$member->id] = $member;
}

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
  ->setUsername('account@gmail.com')
  ->setPassword('password');

$mailer = Swift_Mailer::newInstance($transport);

foreach($members as $member){
  $message = Swift_Message::newInstance('Tirage au sort pour "'.$circle->title.'"')
    ->setFrom(array('account@gmail.com' => 'OhTannenbaum'))
    ->setTo(array($member->email => $member->name))
    ->setBody("
      Bonjour $member->name,

      $owner->name s'est chargé d'effectuer le tirage au sort pour \"$circle->title\".
      Vous êtes donc chargé d'offrir un cadeau à ".$sortedMembers[$member->angelOf]->name."
    ");

  $numSent = $mailer->send($message);
}

print json_encode(array('result' => 'success'));
?>