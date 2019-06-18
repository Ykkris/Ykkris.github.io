function nuage (){
    var nuages = document.querySelectorAll('.nuage');

    nuages.forEach(nuage => {
        // Calcul des tailles
        var tailleNuage = nuage.getBoundingClientRect();
        var tailleTitre = window.getComputedStyle(nuage, '::before').height;
        tailleTitre = parseFloat(tailleTitre);
        
        tailleNuage['height'] = tailleNuage['height'] - tailleTitre;
        
        // Mélange des mots
        var mots = nuage.querySelectorAll('label');

        mots.forEach(mot => { 
            var largeurMot = mot.getBoundingClientRect().width;
            var hauteurMot = mot.getBoundingClientRect().height;

            var collision = true;
            while (collision) {
                mot.style.top = Math.random() * (tailleNuage['height'] - hauteurMot) + tailleTitre +"px";
                mot.style.left = Math.random() * (tailleNuage['width'] - largeurMot)  +"px";

                var motTop = mot.getBoundingClientRect().top;
                var motLeft = mot.getBoundingClientRect().left;

                var motsOK = nuage.querySelectorAll('.motsOK');
                collision = false;
                if( motsOK ) {
                    motsOK.forEach(motOK => {
                        motOKDetails = motOK.getBoundingClientRect();

                        // Vérification de la colision (voir https://developer.mozilla.org/fr/docs/Games/Techniques/2D_collision_detection)
                        if( motLeft < motOKDetails.left + motOKDetails.width &&
                            motLeft + largeurMot > motOKDetails.left &&
                            motTop < motOKDetails.top + motOKDetails.height &&
                            motTop + hauteurMot > motOKDetails.top ) {
                                collision = true;
                            }
                    });
                }
            }
            mot.classList.add('motsOK');
        });
    });
}


// Fonction de récupération de la position
function positionGPS() {
    navigator.geolocation.getCurrentPosition(initMap);
}


// Fonction d'initialisation de la carte
function initMap(position) {
    // Initialistion de l'icone
    // Nous définissons l'icône à utiliser pour le marqueur, sa taille affichée (iconSize), sa position (iconAnchor) et le décalage de son ancrage (popupAnchor)
	var myIcon = L.icon({
			iconUrl: 'img/icon.svg',
			iconSize: [50, 50],
			iconAnchor: [25, 50],
			popupAnchor: [-3, -76],
		});

    // On initialise la latitude et la longitude de Paris (centre de la carte)
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var macarte = null;
			
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 15);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    // L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    // Nous ajoutons un marqueur
    L.marker([lat, lon], { icon: myIcon }).addTo(macarte);
}

// Sign-in Google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  // Mettre name automatiquement dans checkbox
  function textNameCompletion() {
      document.querySelectorAll('input[type=checkbox]:not([value])').forEach(input => {
            input.setAttribute('value', document.querySelector(`label[for=${input.id}`).innerHTML);
      });
  }
  

  window.addEventListener('load', () => {
    textNameCompletion();
    document.querySelectorAll('form').forEach( form => {
        form.addEventListener("submit", (e) => {
            // Bloquer envoi du formulaire
            e.preventDefault();
            var datas = new FormData(form);

            datas.append('location', form.getAttribute('data-location'));

            for(var pair of datas.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }

            datas.forEach(data => {
                console.log(data);
            });

            // Envoie AJAX
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://192.168.1.45/blablaterie/testingAjax.php', true);

            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    if( JSON.parse(this.responseText).ok ) {
                        console.log(form.getAttribute('action'));
                        window.location = form.getAttribute('action');
                    }
                }
            }
            xhr.send(datas);
        });
    });
  });