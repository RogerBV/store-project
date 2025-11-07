const SERVER_NAME = import.meta.env.VITE_BACKEND_HOST
const PORT = import.meta.env.VITE_BACKEND_PORT

export const makeRequest = async (url: string, objRequestOptions: object) => {
    const baseUrl = `http://${SERVER_NAME}:${PORT}`
    const response = await fetch(`${baseUrl}/${url}`, objRequestOptions)
    if (response.status == 401) {
        document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          });
        console.log('Cookie: ' + document.cookie)
    }
        
    return response
}