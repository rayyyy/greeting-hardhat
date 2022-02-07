function App() {
  const onClick = () => {
    console.log(11111111111)
  }
  return (
    <div className="App">
      <h1>Greet文</h1>
      <p>おはよう</p>

      <input type="text" />
      <button onClick={onClick}>更新</button>
    </div>
  )
}

export default App
