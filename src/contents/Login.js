import '../App.css'
import {useState} from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import { authenticate } from '../services/authorize'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../services/auth-context'

const  Login = ()=>{
  const navigate = useNavigate();

  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  
  
  const [errorUserName,setErrorUserName] = useState ('')
  const [errorPassword,setErrorPassword] = useState ('')
  
  
  const [userNameColor,setUserNameColor] = useState('')
  const [passwordColor,setPasswordColor] = useState ('')

  // const handleSubmit = (e) => {
    const handleSubmit = (e, updateState) => {
      e.preventDefault();
    //// 
    //if(userName.length>8){
    //  setErrorUserName('')
    //  setUserNameColor('green')
    //}else{
    //  setErrorUserName('Tên đăng nhập không tồn tại')
    //  setUserNameColor('red')
    //}
    //if(password.length>8){
    //  setErrorPassword('')
    //  setPasswordColor('green')
    //}else{
    //  setErrorPassword('Mật khẩu Không đúng')
    //  setPasswordColor('red')
    //}
    //
    
      axios.post('http://localhost:8000/api-auth', {
        username: userName,
        password: password })
        .then (response =>{
          // Lưu trữ token nhận được vào localStorage hoặc cookie
          localStorage.setItem('token', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          updateState(true)
          authenticate(response,() => navigate('/hardware'));
        //console.log(response.data.status)
        //console.log(response.data.access)
        //console.log(response.data.refresh)
        // Điều hướng đến trang được bảo vệ
        })
        .catch((error) =>{
          console.error(error)
          setErrorUserName('Tên đăng nhập không tồn tại')
          setUserNameColor('red')
          setErrorPassword('Mật khẩu Không đúng')
          setPasswordColor('red')
        });
  };

  

//     axios.post("https://www.melivecode.com/api/login", {
//       username: userName,
//       password: password
//     })
//     .then (response =>{
//       authenticate(response,()=> props.history.push('/dashboard'))
//       localStorage.setItem('token', response.data.accessToken);
//       localStorage.setItem('user', response.data.user);
//       console.log(response.data.accessToken)
//       console.log(response.data.status)
//       console.log(response.data.message)
//       console.log(response.data.user)
//     });
// }


  return(
  <div className="container">
    <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit} >
          <div className="form-control">
            <label>Tên đăng nhập</label>
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} style={{borderColor:userNameColor}}></input>
            <small style={{color:userNameColor}}>{errorUserName}</small>
          </div>
          <div className="form-control">
            <label>Mật khẩu</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}></input>
            <small style={{color:passwordColor}}>{errorPassword}</small>
          </div>
          <div className="form-control">
          <Link to="/Register">Tạo tài khoản?</Link>

          </div>
          <AuthContext.Consumer>

            {({ loggedIn, setLoggedIn }) => (
          <button type="button" onClick={(e) => {
            handleSubmit(e, setLoggedIn)
            }} >Đăng Nhập</button>
          )}
          </AuthContext.Consumer>
          
      </form>
    </div>
  )
}

export default (Login);


