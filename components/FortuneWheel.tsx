'use client'

import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactConfetti from 'react-confetti'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from './ui/alert-dialog'

const prizes = [
  { option: 'R$ 5', style: { backgroundColor: '#FF6B6B', textColor: 'white' }, weight: 30 },
  { option: 'R$ 10', style: { backgroundColor: '#4ECDC4', textColor: 'white' }, weight: 15 },
  { option: 'R$ 20', style: { backgroundColor: '#45B7D1', textColor: 'white' }, weight: 8 },
  { option: 'Crédito R$ 15', style: { backgroundColor: '#F7DC6F', textColor: 'black' }, weight: 45 },
  { option: 'R$ 50', style: { backgroundColor: '#A569BD', textColor: 'white' }, weight: 2 },
]

interface FortuneWheelProps {
  logoUrl?: string;
}

export default function FortuneWheel({ logoUrl = '/placeholder.svg?height=50&width=50' }: FortuneWheelProps) {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [result, setResult] = useState('')

  const handleSpinClick = () => {
    if (!mustSpin) {
      const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0)
      let randomNum = Math.random() * totalWeight
      let cumulativeWeight = 0
      let selectedPrizeIndex = 0

      for (let i = 0; i < prizes.length; i++) {
        cumulativeWeight += prizes[i].weight
        if (randomNum < cumulativeWeight) {
          selectedPrizeIndex = i
          break
        }
      }

      setPrizeIndex(selectedPrizeIndex)
      setMustSpin(true)
      setResult('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 relative">
      {result && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <div className="relative mb-8">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={prizes}
          onStopSpinning={() => {
            setMustSpin(false)
            setResult(`Parabéns! Você ganhou ${prizes[prizeIndex].option}`)
          }}
          outerBorderColor="#ccc"
          outerBorderWidth={10}
          innerRadius={50}
          innerBorderColor="#ccc"
          innerBorderWidth={20}
          radiusLineColor="#ccc"
          radiusLineWidth={2}
          perpendicularText={true}
          textDistance={85}
          fontSize={18}
          spinDuration={0.2}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
          <Image
            src={logoUrl}
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
      </div>
      
      {result && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="hidden" id="alert-trigger"></button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-green-100 border-green-400 text-green-800 shadow-lg p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-green-800 text-2xl flex items-center justify-center">
                🎉 Parabéns! 🎉
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-center mt-2">
                {result}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-2"
                onClick={() => setResult('')}
              >
                Fechar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg"
        onClick={() => {
          handleSpinClick()
          setTimeout(() => document.getElementById('alert-trigger')?.click(), 3000)
        }}
        disabled={mustSpin}
      >
        {mustSpin ? 'Girando...' : 'Girar a Roda'}
      </motion.button>

      <footer className="absolute bottom-4 text-center text-gray-600">
        Criado com <span className="text-red-500">❤️</span> por{' '}
        <a href="https://allefschmidt.tech" target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">
          Allef Schmidt
        </a>
      </footer>
    </div>
  )
}
