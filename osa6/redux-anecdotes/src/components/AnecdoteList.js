import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const timerId = useSelector(state => state.timer)

    const vote = (id) => {
        let anecdote = anecdotes.filter(anecdote => anecdote.id === id)[0]
        dispatch(voteAnecdote(anecdote, id))
        dispatch(showNotification(timerId, `You voted '${anecdote.content}'`, 5))
    }

    const sort = (array) => {
        array.sort( (a, b) => { 
            if (a.votes > b.votes) {
              return -1
            }else if (a.votes < b.votes) {
              return 1
            } else {
              return 0
            }
        })
        return array
    }

    return (
        <div>
            {sort(anecdotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList