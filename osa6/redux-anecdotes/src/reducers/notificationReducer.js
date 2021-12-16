import { toggle } from '../reducers/showReducer'

export const showNotification = (notification, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    dispatch(toggle(true))
    setTimeout(function () {
      dispatch(toggle(false))
    }, time * 1000)
  }
}
  
  const initialState = ''
  
  const reducer = (state = initialState, action) => {
    let newNotification
    switch (action.type) {
      case 'NOTIFICATION':
        newNotification = `${action.data}`
        return newNotification
      default: return state
    }
  }
  
  export default reducer