function nuage() {
    var nuages = document.querySelectorAll('.nuage-interets');
    nuages.forEach(nuage => {
        var tailleNuage = nuage.getBoundingClientRect();

        var mots = nuage.querySelectorAll('label');

        mots.forEach(mot => {
            var largeurMot = mot.getBoundingClientRect().width;
            var hauteurMot = mot.getBoundingClientRect().height;

            var collide = true;
            var count = 10000;

            while (collide && count > 0) {

                collide = false;
                mot.style.top = Math.random() * (tailleNuage['height'] - hauteurMot) + "px";
                mot.style.left = Math.random() * (tailleNuage['width'] - largeurMot) + "px";

                var motTop = mot.getBoundingClientRect().top; // y1
                var motLeft = mot.getBoundingClientRect().left; // x1


                var motsOK = nuage.querySelectorAll('.motsOK');//cette ligne renvois un tableau (vide s'il n'y a rien => [] )


                if (motsOK) {//cette ne passe pas dans les cas suivant : 
                    // - motsOK = false
                    // - typeof(motsOK) = "undefined"
                    // - motsOK = null 
                    motsOK.forEach(motOK => {
                        motOKWidth = motOK.getBoundingClientRect().width; // w2
                        motOKHeight = motOK.getBoundingClientRect().height; //h2
                        motOKTop = motOK.getBoundingClientRect().top; // y2
                        motOKLeft = motOK.getBoundingClientRect().left; // x2

                        if (motLeft < motOKLeft + motOKWidth &&
                            motLeft + largeurMot > motOKLeft &&
                            motTop < motOKTop + motOKHeight &&
                            motTop + hauteurMot > motOKTop) {
                            collide = true;
                            count--;
                            if (count == 0)
                                console.log(motOK, mot);
                        }

                    });
                }
            };
            mot.classList.add('motsOK');
        });
    });
};

function initMap(position) {
    console.log(position)
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var macarte = null;
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 17);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    var marker = L.marker([lat, lon]).addTo(macarte);
}
function initPosition() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(initMap);
    initMap
}

var googleUser = {};
var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '462363791632-2pa46khj6ipba5anrti0tjuijsi5jtsd.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('google'));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            console.log(googleUser);
            // window.location="http://localhost:5500/interets.html";
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

function RecupereInteret() {
    document.querySelectorAll('input[type="checkbox"]:not([value])').forEach(input => {
        input.setAttribute('value',
            document.querySelector(`label[for=${input.id}]`).innerText)
    })
}

window.addEventListener('load', () => {
    RecupereInteret()
    document.querySelectorAll('form').forEach(formulaire => {
        formulaire.addEventListener('submit', (e) => {
            e.preventDefault();
            let datas = new FormData(formulaire);

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'testing.Ajax.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var json = this.responseText;
                    isOK = JSON.parse(json).ok == true;

                    if(isOK) {
                        var url = formulaire.getAttribute('action');
                        console.log(url);
                        window.location = url;
                    }
                    console.log(isOK);
                    
                }
            }
            xhr.send(datas);
        });
    });
});

