const INITIAL_STATE = {darkMode: false}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_THEME":
      return {...INITIAL_STATE, darkMode : action.payload}
    default:
      return state
  }
}