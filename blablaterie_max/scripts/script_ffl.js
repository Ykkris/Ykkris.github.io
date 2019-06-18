function nuage () {
    var nuages = document.querySelectorAll('.nuage');
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
}