export const showNotification = (notification) => {
    return {
      type: 'NOTIFICATION',
      data: notification
    }
}
  
  const initialState = 'anecdotesAtStart.map(asObject)'
  
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