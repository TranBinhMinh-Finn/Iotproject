import './Login.css'
import {useState} from "react"


const Registerscreen = ()=>{
  const [userName,setUserName] = useState('')
  const [email, setEmail] = useState ('')
  const [password,setPassword] = useState('')
  const [repassword, setRePassword] = useState ('')

  const [errorUserName,setErrorUserName] = useState ('')
  const [errorEmail,setErrorEmail] = useState ('')
  const [errorPassword,setErrorPassword] = useState ('')
  const [errorRepassword,setErrorRepassword] = useState ('')

  const [userNameColor,setUserNameColor] = useState('')
  const [emailColor,setEmailColor] = useState('')
  const [passwordColor,setPasswordColor] = useState ('')
  const [rePasswordColor,setRePasswordColor] = useState ('')

  const validateForm = (e)=>{
    e.preventDefault()

    if(userName.length>8){
      setErrorUserName('')
      setUserNameColor('green')
    }else{
      setErrorUserName('Vui lòng nhập tên đăng nhập nhiều hơn 8 chữ')
      setUserNameColor('red')
    }
    if(email.includes("@")){
      setErrorEmail('')
      setEmailColor('green')
    }else{
      setErrorEmail('Email không đúng')
      setEmailColor('red')
    }

    if(password.length>8){
      setErrorPassword('')
      setPasswordColor('green')
    }else{
      setErrorPassword('Mật khẩu phải có 8 ký tự trở lên')
      setPasswordColor('red')
    }
    if(repassword !== "" && repassword === password){
      setErrorRepassword('')
      setRePasswordColor('green')
    }else{
      setErrorRepassword('Mật khẩu không trùng nhau')
      setRePasswordColor('red')
    }
    
  }
  return(
    <div className="container">
      <h2>Register</h2>
      <form className="form" onSubmit={validateForm}>
          <div className="form-control">
            <label>Tên đăng nhập</label>
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} style={{borderColor:userNameColor}}></input>
            <small style={{color:userNameColor}}>{errorUserName}</small>
          </div>
          <div className="form-control">
            <label>Email đăng nhập</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} style={{borderColor:emailColor}}></input>
            <small style={{color:emailColor}}>{errorEmail}</small>
          </div>
          <div className="form-control">
            <label>Mật khẩu</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}></input>
            <small style={{color:passwordColor}}>{errorPassword}</small>
          </div>
          <div className="form-control">
            <label>Xác nhận mật khẩu</label>
            <input type="password" value={repassword} onChange={(e)=>setRePassword(e.target.value)} style={{borderColor:rePasswordColor}}></input>
            <small style={{color:rePasswordColor}}>{errorRepassword}</small>
          </div>
          <button type="submit"> Đăng ký</button>
      </form>
    </div>
  )
}
export default Registerscreen