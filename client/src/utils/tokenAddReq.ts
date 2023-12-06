export const addTokenToHeader = () => {
    const token = localStorage.getItem('banner_token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token! );
    myHeaders.append("Content-Type", "application/json");
    return myHeaders
}