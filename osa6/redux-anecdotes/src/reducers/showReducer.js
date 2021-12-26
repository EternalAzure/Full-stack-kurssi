
export const on = (timerId) => {
  console.log('on()', timerId)
  return dispatch => {
    clearTimeout(timerId)
    dispatch({
      type: 'TOGGLE',
      data: true
    })
  }
}

export const off = () => {
  console.log('off()')
  return {
      type: 'TOGGLE',
      data: false
  }
}

const initialState = {timerId: undefined, boolean: false}

const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE':
          return action.data
        default: return state
      }
})

export default reducer