export const loggedIn = (phone, fullName, password, role) => {
  var data = {
    phone, fullName, password, role
  }
  return{
    type: "LOGIN_SUCCESS",
    payload: data
  }
}

export const notAvailable = () => {
  return{
    type: "USERNAME_NOT_AVAILABLE"
  }
}

export const notFound = () => {
  return {
    type: "USER_NOT_FOUND"
  }
}

export const serverError = () => {
  return{
    type: "SERVER_ERROR"
  }
}

export const reset = () => {
  return{
    type: "RESET_USER"
  }
}

export const setError = (msg) => {
  return{
    type: "SET_ERROR",
    payload: msg
  }
}
