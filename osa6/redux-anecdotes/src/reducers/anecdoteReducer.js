import anecdoteService from "../services/anecdotes"

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
}
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote, id) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote, id)
    dispatch({
      type: 'VOTE',
      data: newAnecdote,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      let newState = [...state]
      let index = newState.findIndex(anecdote => anecdote.id === action.data.id)
      newState[index] = action.data
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