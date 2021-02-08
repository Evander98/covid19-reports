const INITIAL_STATE = {phone: "", fullName: "", role: "", error: ""}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case "LOGIN_SUCCESS":
      return {...INITIAL_STATE, phone: action.payload.phone, fullName: action.payload.fullName, role: action.payload.role}
    case "USERNAME_NOT_AVAILABLE":
      return {...INITIAL_STATE, error : 'Phone number is not available'}
    case "USER_NOT_FOUND":
      return {...INITIAL_STATE, error : "Phone or Password Incorect!"}
    case "SERVER_ERROR" :
      return {...INITIAL_STATE, error : "Server error!"}
    case "SET_ERROR":
      return {...INITIAL_STATE, error : action.payload}
    case "RESET_USER" :
      return INITIAL_STATE
    default:
      return state
  }
}