
export const Translations = (par) =>{
   
    if (par.language === 'en'){ return{
    birthday:"Birthday",
    gender: "Gender",
    signOff:"Sign off",
    searchUser: "Search user",
    placeholderPf: "What are you thinking",
    selectPicture: "Select an image for your profile picture"
}}

if (par.language === 'es'){
   return {
    birthday:"Fecha de nacimiento",
    gender:"Género",
    signOff:"Cerrar Sesión",
    searchUser: "Buscar usuario",
    placeholderPf: "¿Qué estás pensando?",
    selectPicture: "Selccione una imágen para su foto de perfil"


    }
}

if (par.language === 'fr') {
    return {
        birthday: "Date de naissance",
        gender: "Genre",
        signOff: "Déconnexion",
        searchUser: "nose",
        placeholderPf:"bla en frances",
        selectPicture: "bla"
    };
}

}