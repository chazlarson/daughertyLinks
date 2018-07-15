
export const getDaughertyLinks = () =>{
    //return fetch('/api/links.json');
    return fetch('https://daughery-links.firebaseio.com/items.json');
}