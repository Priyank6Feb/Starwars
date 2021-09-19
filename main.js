var optionSelected = "";

const starWarsApp = {
    // url list to be added to navigation menu
    urls: {
        base: 'https://swapi.dev/api/',
        people: 'people/',
        films: 'films/',
        vehicles: 'vehicles/',
        starships: 'starships/',
        planets: 'planets/',
        species: 'species/'
    },
    init: () => {
        starWarsApp.addListeners();
        starWarsApp.buildNavigation();
    },
    addListeners: () => {
        let nav = document.getElementById('nav');
        nav.addEventListener('click', starWarsApp.getData);
        footer.addEventListener('click', starWarsApp.getData);
    },
    buildNavigation: () => {
        let df = new DocumentFragment();
        for (let uri in starWarsApp.urls) {
            if (uri != 'base') {
                let link = document.createElement('a');
                link.href = `${starWarsApp.urls.base}${starWarsApp.urls[uri]}`;
                link.textContent = uri.toUpperCase();
                link.setAttribute('data-link', `${starWarsApp.urls.base}${starWarsApp.urls[uri]}`);
                df.append(link);
            }
        }
        document.getElementById('nav').append(df);
    },
    getData: (ev) => {
        if (ev) ev.preventDefault();
        //show  loader
        document.querySelector('.overlay').classList.add('active');
        //get the url
        let link = ev.target;
        //get option selected
        optionSelected = link.textContent;
        let url = link.getAttribute('data-link');
        //fetch the data
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(starWarsApp.displayData)
            .catch((err) => {
                console.error(err);
                document.querySelector('.overlay').classList.remove('active');
            });
        //call the display data function
    },
    displayData: (data) => {
        let displaydDiv = document.getElementById('main');
        let output = "";
        //hide the overlay / loader
        document.querySelector('.overlay').classList.remove('active');
        data.results.forEach(element => {
            if (optionSelected.toLowerCase().includes('people')) {
                output +=
                    `<div class="card cardLayout opacity">
                        <h4 class="card-title text-center">${element.name}</h4>
                        <div class="card-content">
                            <span> Height </span>: ${element.height}<br>
                            <span> Birth Year </span>: ${element.birth_year}<br>
                            <span> Eye Color </span>: ${element.eye_color.toUpperCase()}<br>
                            <span> Gender </span>: ${element.gender.toUpperCase()}<br>
                        </div>
                    </div>`
            }
            else if (optionSelected.toLowerCase().includes('planets')) {
                output +=
                    `<div class="card cardLayout opacity">
                        <h4 class="card-title text-center">${element.name}</h4>
                        <div class="card-content">
                            <span> Climate </span>: ${element.climate}<br>
                            <span> Gravity </span>: ${element.gravity}<br>
                            <span> Population </span>: ${element.population}<br>
                            <span> Diameter </span>: ${element.diameter}<br>
                        </div>
                    </div>`
            }
            else if (optionSelected.toLowerCase().includes('films')) {
                output +=
                    `<div class="card cardLayout opacity">
                        <h4 class="card-title text-center">${element.title}</h4>
                        <div class="card-content">
                            <span> Director </span>: ${element.director}<br>
                            <span> Producer </span>: ${element.producer}<br>
                            <span> Release Date </span>: ${element.release_date}<br>
                            <p> Synopsis </p> ${element.opening_crawl}<br>
                        </div>
                    </div>`
            }
            else if (optionSelected.toLowerCase().includes('species')) {
                output +=
                    `<div class="card p-3 m-3 opacity">
                        <h4 class="card-title text-center">${element.name}</h4>
                        <div class="card-content">
                            <span> Classification </span>: ${element.classification}<br>
                            <span> Designation </span>: ${element.designation}<br>
                            <span> Lifespan </span>: ${element.average_lifespan}<br>
                            <span> Language </span>: ${element.language}<br>
                        </div>
                    </div>`
            }
            else if (optionSelected.toLowerCase().includes('vehicles')) {
                output +=
                    `<div class="card p-3 m-3 opacity">
                        <h4 class="card-title text-center">${element.name}</h4>
                        <div class="card-content">
                            <span> Model </span>: ${element.model}<br>
                            <span> Crew </span>: ${element.crew}<br>
                            <span> Cargo Capacity </span>: ${element.cargo_capacity}<br>
                            <span> Vehicle Class </span>: ${element.vehicle_class}<br>
                        </div>
                    </div>`
            }
            else if (optionSelected.toLowerCase().includes('starships')) {
                output +=
                    `<div class="card p-3 m-3 opacity">
                        <h4 class="card-title text-center">${element.name}</h4>
                        <div class="card-content">
                            <span> Model </span>: ${element.model}<br>
                            <span> Manufacturer </span> : ${element.manufacturer}<br>
                            <span> Crew </span>: ${element.crew}<br>
                            <span> Starship Class </span>: ${element.starship_class}<br>
                        </div>
                    </div>`
            }

        });
        displaydDiv.innerHTML = output;
        //add the prev/next navigation
        let footer = document.getElementById('footer');
        footer.innerHTML = '';

        if (data.previous) {
            // Add previous page link
            let prev = document.createElement('a');
            prev.href = data.previous;
            let url = new URL(data.previous);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            prev.textContent = `<< Previous ${label}`;
            prev.setAttribute('data-link', data.previous);
            footer.append(prev);
        }
        if (data.next) {
            // Add next page link
            let next = document.createElement('a');
            next.href = data.next;
            let url = new URL(data.next);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            next.textContent = `Next ${label} >>`;
            next.setAttribute('data-link', data.next);
            footer.append(next);
        }
    },
};

document.addEventListener('DOMContentLoaded', starWarsApp.init);