const API = "http://localhost:5000/api";

export const getAllQuetions = () =>{
    return fetch(`${API}/quetions`)
    .then((res)=>res.json())
    .catch(err=>console.log(err));
}

export const getSolvedQuetions = (userId,token) =>{
    return fetch(`${API}/quetions/user/${userId}`,{
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const addCompletedQuetion = (userId,qId,token) =>{
    return fetch(`${API}/quetions/user/${userId}/${qId}`,{
        method : "PUT",
        headers : {
            "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
        }
        
    }).then(res=>res.json())
    .catch(err=>console.log(err));
}

export const deleteCompletedQuetion = (userId,qId,token) =>{
    return fetch(`${API}/quetions/user/${userId}/${qId}`,{
        method : "DELETE",
        headers : {
            "Content-Type" :'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err));
}