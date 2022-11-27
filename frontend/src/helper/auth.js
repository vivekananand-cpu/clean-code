const API = 'http://localhost:5000/api';

export const signup = (user) =>{
    return fetch(`${API}/signup`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
};

export const login = (user) =>{
    return fetch(`${API}/signin`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    }).then(res=>res.json())
    .catch(err=>console.log(err))
};

export const signout =(next) =>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt');
        next();
    }
    return fetch(`${API}/signout`,{
        method:"GET",
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res=>console.log("signout success"))
    .catch(err=>console.log(err))
}

export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data));
    }
    console.log(localStorage.getItem('jwt').token);
    next();
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
        return false;
    }
}