function nuage (){
    var nuages = document.querySelectorAll('.nuage-interets');

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