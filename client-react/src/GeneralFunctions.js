const baseUrl = "http://localhost:3000/api/";
const notProtectedUrls = ["users", 'tokens'];

const getHeaders = (token) =>{
    if(token){
        return { 'Content-Type': 'application/json;charset=utf-8', 'Accept': 'application/json', 'Authorization':`Bearer ${token}` }
    }
    else{
        return { 'Content-Type': 'application/json;charset=utf-8','Accept': 'application/json',}  
    };
}

const  post = (url, body) =>{
    let token;
    let result;
    let headers;
    if(!notProtectedUrls.includes(url)){
        token = localStorage.getItem("AuthorizationToken");
        if(!token){
            redirectToLogin();
            return;
        }
    }
    headers = getHeaders(token);
    return new Promise((resolve,reject) =>{
        
        let request = new Request(baseUrl + url,{method:'POST', headers: headers, body:JSON.stringify(body)});
        fetch(request).then(async(response)=>{
            result = await response.json();
            if(response.ok){
                resolve (result)
            }
            else{
                throw result 
            }
                
        })
        .catch( err => {
            alert(err.message)
        })
    })
}

const  put = (url, body) =>{
    let token;
    let result;
    let headers;
    if(!notProtectedUrls.includes(url)){
        token = localStorage.getItem("AuthorizationToken");
        if(!token){
            redirectToLogin()
            return;
        }
    }
    headers = getHeaders(token);
    return new Promise((resolve,reject) =>{
        
        let request = new Request(baseUrl + url,{method:'PUT', headers: headers, body:JSON.stringify(body)});
        fetch(request).then(async(response)=>{
            result = await response.json();
            if(response.ok){
                resolve (result)
            }
            else{
                throw result 
            }
                
        })
        .catch( err => {
            alert(err.message)
        })
    })
}

const  get = (url) =>{
    let result;
    let headers;
    let token = localStorage.getItem("AuthorizationToken");
    if(!token){
        redirectToLogin()
        return;
    }
    headers = getHeaders(token);

    return new Promise((resolve,reject) =>{
        let request = new Request(baseUrl + url,{method:'GET', headers: headers});
        fetch(request).then(async(response)=>{
            result = await response.json();
            if(response.ok){
                resolve (result)
            }
            else
                throw result
        })
        .catch( err =>{
            alert(err.message)
            
        })
    })
}

const  del = (url) =>{
    let result;
    let headers;
    let token = localStorage.getItem("AuthorizationToken");
    if(!token){
        redirectToLogin()
        return;
    }
    headers = getHeaders(token);

    return new Promise((resolve,reject) =>{
        let request = new Request(baseUrl + url,{method:'DELETE', headers: headers});
    
        fetch(request).then(async(response)=>{
            result = await response.json();
            if(response.ok){
                resolve (result)
            }
            else
                throw result
        })
        .catch( err =>{
            alert(err.message)
            
        })
    })
}

const  patch = (url, body) =>{
    let token;
    let result;
    let headers;
    if(!notProtectedUrls.includes(url)){
        token = localStorage.getItem("AuthorizationToken");
        if(!token){
            redirectToLogin();
            return;
        }
    }
    headers = getHeaders(token);
    return new Promise((resolve,reject) =>{
        
        let request = new Request(baseUrl + url,{method:'PATCH', headers: headers, body:JSON.stringify(body)});
        fetch(request).then(async(response)=>{
            result = await response.json();
            if(response.ok){
                resolve (result)
            }
            else{
                throw result 
            }
                
        })
        .catch( err => {
            alert(err.message)
        })
    })
}

const redirectToLogin = () => {
    window.location.href = `${baseUrl.replace("/api/",'')}/login`
}

const signUp = async(body) => {
    return new Promise(async (resolve,reject) => {
        let  result = await post('users', body);
        resolve(result)
    })
}

const signIn = async(body) => {
    return new Promise(async (resolve,reject) => {
        let  result = await post('tokens', body);
        if(result && result.token){
           localStorage.setItem("AuthorizationToken", result.token);
        }
        resolve(result)
    })
}