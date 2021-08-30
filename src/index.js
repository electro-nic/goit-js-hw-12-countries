import './sass/main.scss';
import debounce from 'lodash.debounce';
import { error, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
}

const handlInput = (e) => {
    e.preventDefault()
    clearCountriesContainer()
    const name = refs.input.value;
        
 
fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => response.json())
    .then(data => {
                
        if (data.length > 1 && data.length <= 10) {
            renderlistCountriesCollection(data);
        }
        
        if (data.length === 1) {
            renderlistCollection(data);
        }
        if (data.length > 10) {
defaultModules.set(PNotifyMobile, {});
error({
    text: 'Too many matches found. Please enter a more specific query.'
});  
        };
        if (data.status === 404) {
             clearContent ()
            error({
                text: "Please enter correct name of the country."
            });
        };
        
    })    

    .catch(err => {
        clearContent()
    })
}

function dataCountry({name, capital, population, languages, flag }) {
    const article = `<article class = "country">
    <div class = "country-information">
<h1><b>${name}</b></h1>
<p><b>Capital: </b>${capital}</p>
<p><b>Population: </b>${population}</p>
<ul><b>Languages:</b>
<li> ${languages.map(language =>language.name)}</li>
</ul>
</div>
<div class = "country-flag">
<img src = '${flag}' alt = '${name}' width = "300px"/>
</div>
</article>`
    
    
    refs.container.insertAdjacentHTML('beforeend', article)
}


refs.form.addEventListener('input', debounce(handlInput, 500));


function renderlistCollection (arr) {
    arr.forEach(el => dataCountry(el))
}

function renderlistCountriesCollection (arr) {
    arr.forEach(el => createlistCountriesCollection(el))
}

function createlistCountriesCollection ({name}) {
  const article = `
  <li class="countries-list">${name}</li>
  `
  refs.container.insertAdjacentHTML('beforeend', article)
}

function clearCountriesContainer () {
    refs.container.innerHTML = '';
}

function clearContent(){
    refs.input.value = ''; 
  }
 
