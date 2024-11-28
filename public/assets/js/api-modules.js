async function apiCall(url, method = "GET", body = null){
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" }
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function getAccount(){
    const token = localStorage.getItem("sessionToken")
    if(token){
        data = await apiCall('/api/token/verify', 'POST', { token });
        if(data.valid){
            return data;
        }
    }
    return null;
}

async function getAccountDetails(id){
    data = await apiCall('/api/users/get', 'POST', { id })
    if(!data.valid){
        return null;
    }
    return data.user;
}