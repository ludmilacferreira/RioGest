"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle2, Circle, Clock, Download, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { ThemisLogo } from "@/components/themis-logo"

export default function TimelinePage() {
  const timelineSteps = [
    { label: "Pedido Feito", completed: true },
    { label: "Em Análise", completed: true },
    { label: "Em Andamento", completed: true },
    { label: "Aprovação", completed: false },
    { label: "Serviço Finalizado", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] p-2">
              <ThemisLogo className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900">RioGest</h1>
              <p className="text-sm text-slate-600">Sistema de Gestão Jurídica</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Link href="/solicitacoes">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>

          {/* Page Title */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Linha do Tempo de sua Solicitação</h2>
            <p className="mt-1 text-slate-600">Acompanhe o status e progresso da sua solicitação</p>
          </div>

          {/* Timeline Card */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">Status da Solicitação</CardTitle>
                <div className="flex items-center gap-2 rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-sm font-medium text-[#1e3a5f]">
                  <Clock className="h-4 w-4" />
                  Em Andamento
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

                {/* Timeline Steps */}
                <div className="space-y-8">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="relative flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${
                          step.completed ? "bg-[#1e3a5f]" : "bg-slate-200"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        ) : (
                          <Circle className="h-6 w-6 text-slate-400" />
                        )}
                      </div>

                      {/* Label */}
                      <div
                        className={`flex-1 rounded-lg border p-4 ${
                          step.completed ? "border-slate-300 bg-white" : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <p className={`font-semibold ${step.completed ? "text-slate-900" : "text-slate-500"}`}>
                          {step.label}
                        </p>
                        {step.completed && (
                          <p className="mt-1 text-sm text-slate-600">
                            Concluído • {new Date().toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2 border-slate-300 bg-transparent" disabled>
                  <Download className="h-4 w-4" />
                  Baixar Documentação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-slate-200 bg-[#1e3a5f]/5 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <Clock className="h-5 w-5 text-[#1e3a5f]" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Tempo Estimado: 5-7 dias úteis</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Você receberá notificações por email conforme sua solicitação avançar nas etapas.
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    Contato do Jurídico: <span className="text-[#1e3a5f]">(81) 99196-8022</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
