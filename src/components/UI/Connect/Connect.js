import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Connect.scss'
import { gameModes, userTypes } from "../../../utils/constant";

import {
  connectWallet,
  getCurrentWalletConnected
} from '../../../utils/interact.js'
import {
  chainId,
  llgContractAddress,
  llgRewardContractAddress
} from '../../../utils/address'

import {
  getContractWithSigner,
  getContractWithoutSigner
} from '../../../utils/interact'
import { ethers } from 'ethers'

const llgContractABI = require('../../../utils/llg-contract-abi.json')
const llgRewardContractABI = require('../../../utils/llg-reward-contract-abi.json')

let arrInfo = {}

export const Connect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [wallet, setWallet] = useState()
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false)

  const [stage, setStage] = useState('connect')

  let amount
  let walletAddr;

  useEffect(() => {
    addWalletListener()
  }) 

  console.log(location.state);

  switch (location.state.roomName) {
    case 'Classic Room':
      amount = 0
      break
    case 'Silver Room':
      amount = 50
      break
    case 'Gold Room':
      amount = 100
      break
    case 'Platinum Room':
      amount = 200
      break
    case 'Diamond Room':
      amount = 500
      break
    default:
  }

  arrInfo = {
    connect: {
      text: 'You need ' + amount + ' LLG to start the game.',
      button: 'Connect Wallet'
    },
    join: {
      text: 'Transaction approve. You have deposited ' + amount + ' LLG',
      button: 'Join game'
    },
    deposit: {
      text: 'You need ' + amount + ' LLG to start the game.',
      button: 'Deposit LLG'
    },
    depositFail: {
      text: 'Transaction failed. You need ' + amount + 'LLG to start the game',
      button: 'Deposit LLG'
    }
  }

  /************************************************************************************* */
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          // this.setState({
          //   wallet: accounts[0],
          //   status: 'Wallet connected'
          // })
          setWallet(accounts[0])
          setStatus('Wallet connected')
        } else {
          // this.setState({
          //   wallet: '',
          //   status: '🦊 Connect to Metamask.'
          // })
          setWallet('')
          setStatus('🦊 Connect to Metamask.')
        }
      })
      window.ethereum.on('chainChanged', chain => {
        this.connectWalletPressed()
        if (chain !== chainId) {
        }
      })
    } else {
      // this.setState({
      //   status: (
      //     <p>
      //       {' '}
      //       🦊{' '}
      //       {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.(https://metamask.io/download.html)
      //       {/* </a> */}
      //     </p>
      //   )
      // })
      let stat = (
        <p>
          {' '}
          🦊{' '}
          {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.(https://metamask.io/download.html)
          {/* </a> */}
        </p>
      )

      setStatus(stat)
    }
  }

  const connectWalletPressed = async () => {
    let walletResponse = await connectWallet()
    // this.setState({
    //   status: walletResponse.status,
    //   wallet: walletResponse.address
    // })
    setWallet(walletResponse.address)
    setStatus(walletResponse.status)
    walletAddr = walletResponse.address;

    // alert(walletResponse.address)
    return walletResponse.address != null
  }

  const makeDeposit = async () => {
    let llgContract = getContractWithSigner(
      llgContractAddress,
      llgContractABI
    )

    console.error(location.state.roomName + ' ' + location.state.roomKey)

    let amount = 50
    switch (location.state.roomName) {
      case 'Classic Room':
        amount = 0
        break
      case 'Silver Room':
        amount = 50
        break
      case 'Gold Room':
        amount = 100
        break
      case 'Platinum Room':
        amount = 200
        break
      case 'Diamond Room':
        amount = 500
        break
      default:
    }

    let spender = llgRewardContractAddress
    
    let tx = await llgContract.approve(
      ethers.utils.getAddress(spender),
      ethers.BigNumber.from(amount * 1000000000),
      {
        value: 0,
        from: wallet
      }
    )

    if (tx.code == 4001) return false
    let res = await tx.wait()
    if (res.transactionHash) {
      let llgRewardContract = getContractWithSigner(
        llgRewardContractAddress,
        llgRewardContractABI
      )


      let tx2 = await llgRewardContract.deposit(
        ethers.BigNumber.from(location.state.roomKey),
        ethers.utils.getAddress(wallet),
        ethers.BigNumber.from(amount),
        {
          value: 0,
          from: wallet
        }
      )

      if (tx2 == null) return false

      let res2 = await tx2.wait()

      if (res2.transactionHash) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  /************************************************************************************* */

  const nextStage = async () => {
    if (loading) return; 
    setLoading(true)
    switch (stage) {
      case 'connect':
        try {
          let res = await connectWalletPressed()
          if (res) {
            if(walletAddr == null || walletAddr == '') break;
            if(location.state.roomName == "Classic Room") {
              navigate('/gameScene', { state: {...location.state, wallet: walletAddr} })
            } else {
              setStage('deposit')
            }
          }
        } catch (e) {
          alert('Please connect wallet...')
        }
        break
      case 'join':
        navigate('/gameScene', { state: {...location.state, wallet} })
        break
      case 'deposit':
        try {
          let res1 = await makeDeposit()
          if (res1) setStage('join')
          else setStage('depositFail')
        } catch (e) {
          setStage('depositFail')
        }
        break
      case 'depositFail':
        try {
          let res2 = await makeDeposit()
          if (res2) setStage('join')
          else setStage('depositFail')
        } catch (e) {
          setStage('depositFail')
        }
        break
      default:
    }
    setLoading(false)
  }

  return (
    <div className='Connect'>
      <div className='u-container'>
        <div className='u-ribbon'>Play to earn</div>
        <div className='u-content'>
          <div className='u-content-container'>
            <div className='u-text'>{arrInfo[stage].text}</div>

            <div className='u-button' onClick={() => nextStage()}>
              {loading ? 'Loading...' : arrInfo[stage].button}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connect
