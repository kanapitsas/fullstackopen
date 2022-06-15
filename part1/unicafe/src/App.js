import { useState } from 'react'

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Stats = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Average" value={(good-bad)/(good+bad+neutral)} />
          <StatisticLine text="Positive" value={100*(good)/(good+bad+neutral)} />
        </tbody>
      </table>
    )
  }
  else {return (<div>No feedback given</div>)}
}

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text} </button>
)

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> What do you think of our service? </h1>
      <Button handleClick={() => setGood(good+1)} text="barely acceptable" />
      <Button handleClick={() => setNeutral(neutral+1)} text="whatever" />
      <Button handleClick={() => setBad(bad+1)} text="burn in hell" />

      <h1> Statistics </h1>
      <Stats good={good} neutral={neutral} bad={bad} />
        
    </div>
  )
}

export default App
