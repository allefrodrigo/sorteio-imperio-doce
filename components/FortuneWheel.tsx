'use client'

import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { motion } from 'framer-motion'
import Image from 'next/image'

const prizes = [
  { option: 'R$ 5', style: { backgroundColor: '#FF6B6B', textColor: 'white' }, weight: 20 },
  { option: 'R$ 10', style: { backgroundColor: '#4ECDC4', textColor: 'white' }, weight: 15 },
  { option: 'R$ 20', style: { backgroundColor: '#45B7D1', textColor: 'white' }, weight: 10 },
  { option: 'Crédito R$ 15', style: { backgroundColor: '#F7DC6F', textColor: 'black' }, weight: 40 },
  { option: 'R$ 50', style: { backgroundColor: '#A569BD', textColor: 'white' }, weight: 5 },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
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
          fontSize={16}
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
        <p className="text-xl font-semibold text-center mb-4">{result}</p>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg"
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {mustSpin ? 'Girando...' : 'Girar a Roda'}
      </motion.button>
    </div>
  )
}
