import dynamic from 'next/dynamic'

const FortuneWheel = dynamic(() => import('../components/FortuneWheel'), { ssr: false })

export default function Page() {
  return (
    <div>
      <FortuneWheel logoUrl="https://files.menudino.com/cardapios/17201/logo.png" />
      </div>
  )
}
