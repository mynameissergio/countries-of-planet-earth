# Countries of Planet Earth

Welcome to Sergio Santanas coding exercise, which employs technolgies such as Laravel 5.1, PHP 7.1, and ReactJS to produce a 
UI to search for countries that find themselves on earth.

It is first necessary to run `composer install` from the project directory to install Laravel dependecies.
Afterwards to try it out, navigate to the `public` directory in this project:

`cd public`

Simply start up the built-in php server:

`php -S localhost:8000`

Navigate to localhost:8000 in your browser and type away! The page will automatically populate with a list of countries along with the desired information.

Files of interest are
`resources/assets/js/components/countries.js` (React components)
and `/app/Http/Controllers/CountryController.php` (PHP controllers)
