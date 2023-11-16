export default function UrlString(){
    console.log('Function startet');
    const gclid = localStorage.getItem('gclid');
    const source = localStorage.getItem('utm_source');
    const medium = localStorage.getItem('utm_medium');
    const referer = localStorage.getItem('referer');
    const userID = localStorage.getItem('userid')
    const pagePath = window.location.pathname;
    const urlString = `?uid=${gclid}&uid2=${source};${medium};${referer};${pagePath};${userID}`
    console.log('URLString: ', urlString);
    return urlString;
}