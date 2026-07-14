import { HistoryCard } from '@/components/features/History/HistoryCard'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'

interface HistoryEmptyStateProps {
  onNewSimulation: () => void
}

function HistoryEmptyState({ onNewSimulation }: HistoryEmptyStateProps) {
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center">
      <p className="text-foreground mb-2 text-lg font-semibold">
        Nenhuma simulação salva
      </p>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        Quando você concluir uma simulação, ela aparecerá aqui para consulta e
        exclusão.
      </p>
      <Button variant="primary" onClick={onNewSimulation}>
        Nova simulação
      </Button>
    </div>
  )
}

interface HistoryListProps {
  simulations: SimulationRecord[]
  onDelete: (id: string) => void
  onNewSimulation: () => void
}

export function HistoryList({
  simulations,
  onDelete,
  onNewSimulation,
}: HistoryListProps) {
  if (simulations.length === 0) {
    return <HistoryEmptyState onNewSimulation={onNewSimulation} />
  }

  return (
    <div className="flex flex-col gap-4">
      {simulations.map((simulation) => (
        <HistoryCard
          key={simulation.id}
          simulation={simulation}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

interface HistoryPageContentProps {
  simulations: SimulationRecord[]
  onDelete: (id: string) => void
  onNewSimulation: () => void
}

export function HistoryPageContent({
  simulations,
  onDelete,
  onNewSimulation,
}: HistoryPageContentProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Consulte, reabra ou exclua as simulações salvas neste navegador."
      />
      <HistoryList
        simulations={simulations}
        onDelete={onDelete}
        onNewSimulation={onNewSimulation}
      />
    </main>
  )
}
