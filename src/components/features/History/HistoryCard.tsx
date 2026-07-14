import {
  CalendarClock,
  Eye,
  Goal,
  Sparkles,
  Trash2,
  Wallet,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

interface HistoryCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

function formatDate(isoDate?: string) {
  if (!isoDate) {
    return null
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate))
}

export function HistoryCard({ simulation, onDelete }: HistoryCardProps) {
  const navigate = useNavigate()
  const monthlySavings = calcMonthlySavings(simulation)
  const createdAtLabel = formatDate(simulation.createdAt)

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Excluir a simulação "${simulation.goalName}"? Esta ação não pode ser desfeita.`,
    )

    if (confirmed) {
      onDelete(simulation.id)
    }
  }

  return (
    <article className="bg-card flex flex-col gap-5 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Goal size={16} className="text-primary shrink-0" />
            <h2 className="text-foreground truncate text-lg font-semibold">
              {simulation.goalName}
            </h2>
          </div>
          {createdAtLabel && (
            <p className="text-muted-foreground text-xs">{createdAtLabel}</p>
          )}
        </div>

        {simulation.insight ? (
          <span className="bg-muted-primary/30 text-primary inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
            <Sparkles size={12} />
            Com insight
          </span>
        ) : (
          <span className="text-muted-foreground bg-secondary-button inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
            Sem insight
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border-border rounded-xl border p-3">
          <p className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
            Custo da meta
          </p>
          <p className="text-foreground text-sm font-semibold">
            {simulation.goalAmount}
          </p>
        </div>
        <div className="border-border rounded-xl border p-3">
          <div className="mb-1 flex items-center gap-1">
            <CalendarClock size={12} className="text-primary" />
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              Prazo
            </p>
          </div>
          <p className="text-foreground text-sm font-semibold">
            {simulation.goalDeadline} meses
          </p>
        </div>
        <div className="border-border rounded-xl border p-3">
          <div className="mb-1 flex items-center gap-1">
            <Wallet size={12} className="text-primary" />
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              Economia/mês
            </p>
          </div>
          <p className="text-foreground text-sm font-semibold">
            R${' '}
            {monthlySavings.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          icon={Trash2}
          className="text-red-500"
          onClick={handleDelete}
          aria-label={`Excluir simulação ${simulation.goalName}`}
        >
          Excluir
        </Button>
        <Button
          variant="primary"
          icon={Eye}
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  )
}
