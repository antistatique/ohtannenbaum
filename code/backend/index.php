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
  //Send email
  if($member->email){
    $message = Swift_Message::newInstance('Oh Tannenbaum - tirage au sort : "'.$circle->title.'"')
      ->setFrom(array('account@gmail.com' => 'OhTannenbaum'))
      ->setTo(array($member->email => $member->name))
      ->setBody("
      Bonjour $member->name !

      $owner->name s'est occupé d'effectuer le tirage au sort pour: $circle->title.

      Ton cadeau sera pour : ".$sortedMembers[$member->angelOf]->name."

      En cas de question, n'hésite pas à me contacter :
      $owner->name
      $owner->phone
      $owner->email
      ");

    $numSent = $mailer->send($message);
    }else{
      //Send SMS
    }
}

print json_encode(array('result' => 'success'));
?>