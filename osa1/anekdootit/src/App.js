import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const votesList = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(votesList)
  
  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {vote[selected]} votes
      <br></br>

      <button onClick={()=> {
          setSelected(
            Math.floor(Math.random() * anecdotes.length)
          )
        }
      }>
        next anecdote
      </button>

      <button onClick={handleVote}>
        vote
      </button>

      <div>
        <h1>Anecdote with most votes</h1>
        <MostVoted vote={vote}  anecdote={anecdotes} length={vote.length} />
      </div>
    </div>
  )
}

const MostVoted = ({vote, anecdote, length}) => {
  let index = 3
  let i
  for (i = 0; i < length; i++){
      if (vote[i] > vote[index]){
        index = i
      }
  }
  return(
    <div>
      {anecdote[index]}
    </div>
  )
}

export default App
