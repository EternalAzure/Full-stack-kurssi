const initialState = false

export const toggle = (boolean) => {
    return {
        type: 'TOGGLE',
        data: boolean
    }
}

const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE':
          return action.data
        default: return state
      }
})

export default reducer