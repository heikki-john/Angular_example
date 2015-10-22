var variable = 2;

/* HUONO TAPA 
function doSomething(){
    
    console.log("This is something...");
}

//Exportilla liitos ulkopuolelle, ilman tätä ei voida käyttää ulkopuolelta tms.
exports.doSomething = doSomething;

*/

/* HYVÄ TAPA */
exports.doSomething = function(){
    
    console.log("This is something...");
}

exports.joni = "Päänsärkypäivä"