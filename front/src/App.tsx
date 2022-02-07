import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

function App() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const [address, setAddress] = useState('')

  useEffect(() => {
    const f = async () => {
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      setAddress(await signer.getAddress())
    }
    f()
  })

  const onClick = async () => {
    console.log('Account:', address)
  }
  return (
    <div className="App">
      <h1>Greet文</h1>
      <p>おはよう {address !== '' ? address : 'Guest'}</p>

      <input type="text" />
      <button onClick={onClick}>更新</button>
    </div>
  )
}

export default App
