import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if(all > 0){
    return(
      <table>
            <StatisticsLine name='good' value={good}/>
            <StatisticsLine name='neutral' value={neutral}/>
            <StatisticsLine name='bad' value={bad}/>
            <StatisticsLine name='all' value={all}/>
            <StatisticsLine name='average' value={(good - bad) / all} />
            <StatisticsLine name='positive' value={(good / all) * 100} unit='%' />
      </table>
    )
  }
  return(
    <div>
      No Feedback yet
    </div>
  )
}

const StatisticsLine = (props) => {
  return(
    <tr>
      {props.name} <td>{props.value}{props.unit}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicked    = () => setGood(good + 1)
  const neutralClicked = () => setNeutral(neutral + 1)
  const badClicked     = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={goodClicked} />
      <Button text='neutral' onClick={neutralClicked} />
      <Button text='bad' onClick={badClicked} />

      <Statistics good={good} neutral={neutral} bad={bad}/>
      

    </div>
  )
}

export default App