
export const Translations = (par) =>{
   
    if (par.language === 'en'){ return{
    birthday:"Birthday",
    gender: "Gender",
    signOff:"Sign off",
    searchUser: "Search user"
}}

if (par.language === 'es'){
   return {
    birthday:"Fecha de nacimiento",
    gender:"Género",
    signOff:"Cerrar Sesión",
    searchUser: "Buscar usuario"
    }
}

if (par.language === 'fr') {
    return {
        birthday: "Date de naissance",
        gender: "Genre",
        signOff: "Déconnexion",
        searchUser: "nose"
    };
}

}