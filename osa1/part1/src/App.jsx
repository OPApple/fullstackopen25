const App = () => {
  const friends = [
    { name: 'Leevi', age: 4 },
    { name: 'Venla', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name}</p>
      <p>{friends[1].name}</p>
    </div>
  )
}

export default App