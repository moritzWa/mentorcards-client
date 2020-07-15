import React, { useReducer, createContext } from "react"
import jwtDecode from "jwt-decode"

//tried to/can't read property of resetStore
//import { useMutation } from "@apollo/react-hooks"
//import { LOGIN_USER } from "../util/graphql"

const initialState = {
  user: null,
}
//check for token in local storage
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"))
  //check if token not expired
  if (decodedToken.exp * 2000 < Date.now()) {
    localStorage.removeItem("jwtToken")
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  //const { client } = useMutation(LOGIN_USER, { fetchPolicy: "network-only" })

  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData,
    })
  }

  function logout() {
    localStorage.removeItem("jwtToken")
    //client.resetStore()
    dispatch({ type: "LOGOUT" })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
