"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemisLogo } from "@/components/themis-logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/solicitacoes"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 px-4 py-12">
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] p-3 w-fit">
            <ThemisLogo className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="font-serif text-3xl font-bold text-slate-900">RioGest</CardTitle>
            <CardDescription className="text-base text-slate-600">Entre com suas credenciais</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Login
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Digite seu login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-[#1e3a5f] text-base font-medium hover:bg-[#2d5a8a]">
              Entrar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
