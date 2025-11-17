"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ThemisLogo } from "@/components/themis-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30">
      {/* Hero Section */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <div className="rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] p-4 shadow-lg">
                <ThemisLogo className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-900">RioGest</h1>
            <p className="text-lg text-slate-600">Automação de Processos Jurídicos</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/login" className="block">
              <Button size="lg" className="w-full bg-[#1e3a5f] text-base font-medium hover:bg-[#2d5a8a]">
                Acessar Sistema
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-slate-500">Gerencie solicitações e acompanhe processos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
