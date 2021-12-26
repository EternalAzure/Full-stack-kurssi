export const timer = (timerId) => {
    console.log('delay()', timerId)
    return {
        type: 'DELAY',
        data: timerId
    }
  }

const initialState = null

const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case 'DELAY':
          return action.data
        default: return state
      }
})

export default reducer