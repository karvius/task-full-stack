<?php
namespace App\Services;

class PlaceholderApiService
{
  public function getRandomUser()
  {
    $client = new \GuzzleHttp\Client();
    $randomInt = rand(0,9);
    $response = $client->request('GET', 'https://jsonplaceholder.typicode.com/users/'.$randomInt);
    $data = json_decode($response->getBody());
    
    $randomUser = [
      'name' => $data->name,
      'email' => $data->email,
      'phone' => $data->phone
    ];

    return $randomUser;
  }
}
