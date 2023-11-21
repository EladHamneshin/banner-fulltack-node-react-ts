export type Response = {
    success: boolean;
    data: {};
    message: string;
}

type User = {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const regiterFetch = (user: User) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/users/register", requestOptions)
        .then(response => {
            console.log(response.json());
            console.log(response);

            return response
        })
        .then(result => console.log(result))
        .catch(error => {
            console.log(error.message);
            return error
        });
}

const getUsersFetch = () => {
    var raw = "";

    var requestOptions : RequestInit = {
        method: 'GET',
        
        redirect: 'follow'
    };

    fetch("http://localhost:5000/users/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
export default {
    regiterFetch,
    getUsersFetch,
}