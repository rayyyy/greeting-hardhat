import { ethers } from 'ethers'
import { ChangeEvent, useEffect, useState } from 'react'
import ABI from './contracts/greeter.json'

function App() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const [greetText, setGreetText] = useState('')
  const [address, setAddress] = useState('')
  const [newGreet, setNewGreet] = useState('')

  const abi = ABI.abi
  const contractAddress = '0x688333c0F1869AF9D153Fcc6aeB8138E0Dc5D9FD'
  const GreeterContract = new ethers.Contract(contractAddress, abi, provider)

  useEffect(() => {
    const f = async () => {
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      setAddress(await signer.getAddress())

      const text = await GreeterContract.functions.greet()
      setGreetText(text)
    }
    f()
  }, [])

  const onClick = async () => {
    if (newGreet === '') {
      return
    }

    try {
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      await GreeterContract.connect(signer).functions.setGreeting(newGreet)
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGreet(e.target.value)
  }

  return (
    <div className="App">
      <h1>Greet文</h1>
      <p>
        {greetText ? greetText : '登録なし'}{' '}
        {address !== '' ? address : 'Guest'}
      </p>

      <input type="text" onChange={onChange} />
      <button onClick={onClick}>更新</button>
    </div>
  )
}

export default App
