import { expect, should } from 'chai'
import { ethers } from 'hardhat'

describe('Greeter', () => {
  const deployedGreeter = async () => {
    const Greeter = await ethers.getContractFactory('Greeter')
    const greeter = await Greeter.deploy('Hello, world!')
    await greeter.deployed()
    return greeter
  }

  it('デプロイ成功', async () => {
    const greeter = await deployedGreeter()
    should().exist(greeter, 'デプロイされてない')
  })

  describe('greet()', () => {
    it('hello worldを返す', async () => {
      const greeter = await deployedGreeter()
      expect(await greeter.greet()).to.equal('Hello, world!')
    })
  })

  describe('setGreeting()', () => {
    it('挨拶文を変更したら、新しい挨拶文を返す', async () => {
      const greeter = await deployedGreeter()

      expect(await greeter.greet()).to.equal('Hello, world!')

      const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

      // 更新されるまで待つ
      await setGreetingTx.wait()

      expect(await greeter.greet()).to.equal('Hola, mundo!')
    })
  })
})
