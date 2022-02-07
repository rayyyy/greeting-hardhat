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
    it('オーナーが挨拶文を変更したら、新しい挨拶文を返す', async () => {
      const greeter = await deployedGreeter()

      expect(await greeter.greet()).to.equal('Hello, world!')

      const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

      // 更新されるまで待つ
      await setGreetingTx.wait()

      expect(await greeter.greet()).to.equal('Hola, mundo!')
    })

    it('オーナー以外が挨拶文を変更できない', async () => {
      const greeter = await deployedGreeter()
      const [_, addr1] = await ethers.getSigners()

      try {
        await greeter.connect(addr1).setGreeting('おはよう')
      } catch (error: any) {
        if (error) {
          expect(error.toString()).to.be.include(
            'Ownable: caller is not the owner'
          )
        }
        return
      }
      should().fail('更新できてしまいました')
    })
  })

  describe('owner()', () => {
    it('オーナーのアドレスを返す', async () => {
      const greeter = await deployedGreeter()
      const ownerAddress = await greeter.owner()
      expect(ownerAddress).to.a('string')
    })

    it('deployしたアドレスとオーナーアドレスがマッチする', async () => {
      const [owner] = await ethers.getSigners()

      const greeter = await deployedGreeter()
      const ownerAddress = await greeter.owner()
      expect(ownerAddress).to.be.equal(owner.address)
    })
  })
})
