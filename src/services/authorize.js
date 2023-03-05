import axios from "axios";

export const authenticate=(response,next)=>{
    if(window !=="false"){
        localStorage.setItem("token",JSON.stringify(response.data.access))
        localStorage.setItem("refresh",JSON.stringify(response.data.refresh))
    }
    axios.get('http://localhost:8000/users/me', { headers: authHeader() }).then(response =>{
        localStorage.setItem("user",JSON.stringify(response.data))
        console.log(getUser().devices)
    })
    next()
}


export const getToken=()=>{
    if(window !=="undefined"){
        if(localStorage.getItem("token")){
            return JSON.parse(localStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const getUser=()=>{
    if(window !=="undefined"){
        if(localStorage.getItem("user")){
            return JSON.parse(localStorage.getItem("user"))
        }else{
            return false
        }
    }
}

export function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const authenticate = (Login) => {
//   return () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const history = useNavigate();

//     useEffect(() => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         history.push('/');
//       } else {
//         // send token to server to validate
//         setIsAuthenticated(true);
//       }
//     }, [history]);

//     return isAuthenticated ? <Login /> : null;
//   };
// }



// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// export const authenticate = (Login) => {
//   return () => {
//     const history = useNavigate();

//     useEffect(() => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         history.push('/login');
//       } else {
//         axios.post('https://www.melivecode.com/api/login', { token })
//           .then(() => {
//             // Người dùng đã được xác thực
//           })
//           .catch(() => {
//             // Token không hợp lệ hoặc đã hết hạn
//             localStorage.removeItem('accessToken');
//             history.push('/dashboard')})
//           }
//         })
//     }
// }
