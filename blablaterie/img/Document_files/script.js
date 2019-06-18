function nuage () {
    var nuages = document.querySelectorAll('.nuage-interets');
    nuages.forEach(nuage => {
        var tailleNuage = nuage.getBoundingClientRect();
        
        var mots = nuage.querySelectorAll('label');

        mots.forEach(mot => {
            var largeurMot = mot.getBoundingClientRect().width;
            var hauteurMot = mot.getBoundingClientRect().height;

            var collide = true;
            var count =10000;
           
            while (collide && count > 0) {
                
                collide = false;
                mot.style.top = Math.random()* (tailleNuage['height'] - hauteurMot) + "px";
                mot.style.left = Math.random()* (tailleNuage['width'] - largeurMot) + "px";

                var motTop = mot.getBoundingClientRect().top; // y1
                var motLeft = mot.getBoundingClientRect().left; // x1


                var motsOK = nuage.querySelectorAll('.motsOK');//cette ligne renvois un tableau (vide s'il n'y a rien => [] )

  
                if(motsOK) {//cette ne passe pas dans les cas suivant : 
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
                                if(count == 0)
                                console.log(motOK, mot);
                        }
                        
                    });  
                }
            } ;
            mot.classList.add('motsOK');
        });
    });
};

function initMap(position,zoom) {
    var lat = position.coords.latitude;
    var lon  = position.coords.longitude;
    var macarte = null;
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], zoom);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    var marker = L.marker([lat, lon]).addTo(macarte);
}
function initPosition(zoom) { 
    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition((pos)=>{
        initMap(pos,zoom);
    });
    initMap
}