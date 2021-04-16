import React, {useState} from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if ((good+neutral+bad) === 0) {
    return (
      <div>
        <div>
          <h1>give feedback</h1>
          <Button handleClick={() => setGood(good + 1)} text='good' />
          <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
          <Button handleClick={() => setBad(bad + 1)} text='bad' />
        </div>
        <h1>statistics</h1>
        No feed back given
      </div>
    )
  }
  
  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good+neutral+bad} />
        <StatisticLine text="average" value={parseFloat((good-bad)/(good+neutral+bad)).toFixed(4)} />
        <StatisticLine text="positive" value={parseFloat(good/(good+neutral+bad)*100).toFixed(2)+"%"} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => 
<tr>
  <td>{text}</td><td>{value}</td>
</tr>

export default App;
