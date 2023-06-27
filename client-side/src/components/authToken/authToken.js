export const authToken = (email) =>{
const currentUser = {
email:email , 
}
fetch(`http://localhost:3032/json-webtoken` , {
method:"POST" ,
headers:{
'content-type' : "application/json"
}
,
body:JSON.stringify(currentUser) 
})
.then(res => res.json())
.then(data => localStorage.setItem('shop-bd-token' , JSON.stringify(data.newToken)))
.catch((error) => console.log(error))
} 
