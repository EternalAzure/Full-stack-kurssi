import { on, off } from './showReducer'
import { timer } from './timerReducer'

export const showNotification = (timerId, notification, time) => {
  return dispatch => {
    dispatch(on(timerId))

    const id = setTimeout(function () {
      dispatch(off())
    }, time * 1000)

    dispatch(timer(id))

    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
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