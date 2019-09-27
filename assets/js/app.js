/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
import '../scss/app.scss';

console.log('Hello from app.js');

// loads the jquery package from node_modules
import $ from 'jquery';

// loads the bootstrap package from node_modules
import bootstrap from "bootstrap";

// Exécuter quand le document est ready
$(document).ready(function () {
    console.log('hello from document');

    
});
