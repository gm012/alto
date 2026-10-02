<?php
declare(strict_types=1);
require __DIR__.'/common.php';
same_origin();
if (($_SERVER['REQUEST_METHOD']??'')!=='POST') {header('Allow: POST');respond(405,['ok'=>false]);}
$data=read_json();
$event=$data['event']??'';$page=$data['path']??'';
if (!is_string($page) || !preg_match('/^[a-z0-9-]+\.html$/',$page) || !is_file(dirname(__DIR__).'/'.$page) || !in_array($event,['page_view','enquiry_success'],true)) respond(422,['ok'=>false]);
$dir=private_dir();$path=$dir.'/usage-'.gmdate('Y-m-d').'.json';
$fp=@fopen($path,'c+');if(!$fp || !flock($fp,LOCK_EX)) respond(503,['ok'=>false]);
$counts=json_decode(stream_get_contents($fp),true)?:[];
$key=$page.':'.$event;$counts[$key]=min(1000000,($counts[$key]??0)+1);
rewind($fp);ftruncate($fp,0);fwrite($fp,json_encode($counts,JSON_PRETTY_PRINT));fflush($fp);flock($fp,LOCK_UN);fclose($fp);@chmod($path,0600);
foreach(glob($dir.'/usage-*.json')?:[] as $old) if(filemtime($old)<time()-15552000) @unlink($old);
respond(200,['ok'=>true]);
