<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\ClientException;
use Illuminate\Routing\Controller as BaseController;
use GuzzleHttp\Client;


class CountryController extends BaseController
{
    private const FIELDS = 'name;alpha2Code;alpha3Code;flag;region;subregion;languages;population';

    /**
     * @var Client
     */
    private $client;

    /**
     * CountryController constructor.
     */
    public function __construct(
    ) {
        $client = new Client([
            'base_uri' => 'https://restcountries.eu/rest/v2/'
        ]);
        $this->client = $client;
    }

    public function findCountriesByQuery($query)
    {
        // Determine endpoint by query length
        if(strlen($query) <= 3) {
            $endpoint = 'alpha/';
        } else {
            $endpoint = 'name/';
        }

        try {
            $response = $this->client->get(
                $endpoint . $query,
                [
                    'query' => [
                        'fields' => self::FIELDS
                    ]
                ]
            );
        } catch (ClientException $e) {
            $response = $e->getResponse();
            return $response->getBody()->getContents();
        }

        $data = json_decode($response->getBody(), true);
        // Sort the response data by name and population
        // Having a name key defined tells us that we received a single country from an alpha code,
        // so no need to sort the data.
        if(!isset($data['name'])) {
            array_multisort(
                array_column($data, 'name'), SORT_ASC, SORT_STRING,
                array_column($data, 'population'), SORT_DESC, SORT_NUMERIC,
                $data
            );
        }
        return $data;
    }

    public function countriesIndex()
    {
        return view('welcome');
    }

}
