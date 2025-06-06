import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',//holy dream theater reference
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(0)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    //setting new monarch
    if(copy[selected] > copy[top]){
      setTop(selected)
    }

  }

  const generateNew = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }


  return (
    <div>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes
      <br/>
      <Button text='vote' onClick={handleVote}/>
      <Button text='random...' onClick={generateNew}/>
      <h1>Most voted</h1>
      {anecdotes[top]}
    </div>
  )
}

export default App