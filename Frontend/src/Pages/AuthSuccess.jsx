import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

const AuthSuccess = () => {
  const { setUser } = Login()
  const navigate = useNavigate()
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      console.log(params);
      const accessToken = params.get("token");
      console.log("Token", accessToken);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
        try {
          const res = await axios.get("http://localhost:4000/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          if (res.data.success) {
            setUser(res.data.user)
            navigate("/")
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    }
    handleAuth()
  },[navigate])
  return (
    <h2>Loging in...</h2>
  )
}

export default AuthSuccess;