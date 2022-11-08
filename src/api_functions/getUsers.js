const BASE_URL = "http://localhost:3001";
const path = '/users';
const token = localStorage.getItem("token");
console.log(token);

export const getUsers = async (newState) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${token}`
        }
    });
    /* console.log(res, 'respuesta de la petición'); */
    
    const dataUsers = await res.json();
    /* console.log(dataProducts, 'data products'); */

    return newState(dataUsers);
}