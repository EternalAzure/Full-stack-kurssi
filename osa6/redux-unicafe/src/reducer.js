const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = state
  switch (action.type) {
    case 'GOOD':
      newState = JSON.parse(JSON.stringify(state))
      newState.good += 1
      return newState
    case 'OK':
      newState = JSON.parse(JSON.stringify(state))
      newState.ok += 1
      return newState
    case 'BAD':
      newState = JSON.parse(JSON.stringify(state))
      newState.bad += 1
      return newState
    case 'ZERO':
      newState = JSON.parse(JSON.stringify(state))
      newState.good = 0
      newState.ok = 0
      newState.bad = 0
      return newState
    default: return state
  }
  
}

export default counterReducer