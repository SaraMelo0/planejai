import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HistoryPageContent } from '@/components/features/History/HistoryList'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function HistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(getAllSimulations)

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations(getAllSimulations())
  }

  return (
    <HistoryPageContent
      simulations={simulations}
      onDelete={handleDelete}
      onNewSimulation={() => void navigate('/')}
    />
  )
}
