// JSON-server makes obsolete?
const getId = () => (100000 * Math.random()).toFixed(0)

// JSON-server makes obsolete?
const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
      //return state.concat(asObject(action.data))
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      let newState = [...state]
      let index = newState.findIndex(anecdote => anecdote.id === action.data)
      newState[index].votes += 1
      newState.sort( (a, b) => { 
        if (a.votes > b.votes) {
          return -1
        }else if (a.votes < b.votes) {
          return 1
        } else {
          return 0
        }
    })
      return newState
    default: return state
  }
}

export default reducer