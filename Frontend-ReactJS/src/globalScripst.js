export default function getHeaders(){
    const AuthStr = 'Bearer '.concat(localStorage.getItem("token")); 
        let headers = { headers: { Authorization: AuthStr } }
        return headers;
}