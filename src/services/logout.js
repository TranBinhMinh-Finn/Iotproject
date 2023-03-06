import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "./auth-context";
const Logout = ()=>{
    const navigate = useNavigate()
    useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
    localStorage.removeItem("user")
    navigate('/')
    })
    return (
        <AuthContext.Consumer>

            {({ loggedIn, setLoggedIn }) => (
                <div onClick={setLoggedIn(false)}></div>
        )}
        </AuthContext.Consumer>
    )
}

export default Logout