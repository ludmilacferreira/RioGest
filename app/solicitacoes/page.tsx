"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, MapPin, ArrowLeft, Download } from 'lucide-react'
import { ThemisLogo } from "@/components/themis-logo"
import jsPDF from "jspdf"

export default function SolicitacoesPage() {
  const [tipoServico, setTipoServico] = useState("")
  const [empreendimentoEscolhido, setEmpreendimentoEscolhido] = useState("")
  const [unidades, setUnidades] = useState<string[]>([])
  const [unidadeCustom, setUnidadeCustom] = useState("")
  const [useCustomUnidade, setUseCustomUnidade] = useState(false)
  const [descricao, setDescricao] = useState("")

  const handleUnidadeToggle = (value: string) => {
    setUnidades((prev) => (prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const unidadesParaPDF = useCustomUnidade ? [unidadeCustom] : unidades

    generateResumoDaSolicitacaoPDF(unidadesParaPDF)

    setTimeout(() => {
      generateProcuracaoNeoenergiaCompleta(unidadesParaPDF)
    }, 500)

    setTimeout(() => {
      generateOutrosDocumentosPDF(unidadesParaPDF)
    }, 1000)

    setTimeout(() => {
      window.location.href = "/timeline"
    }, 1500)
  }

  const generateResumoDaSolicitacaoPDF = (unis: string[]) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPosition = 20

    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.text("RESUMO DA SOLICITAÇÃO", pageWidth / 2, yPosition, { align: "center" })
    yPosition += 10

    doc.setFontSize(12)
    doc.text("RioGest - Sistema de Gestão Jurídica", pageWidth / 2, yPosition, { align: "center" })
    yPosition += 15

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, margin, yPosition)
    yPosition += 6
    doc.text(`Hora: ${new Date().toLocaleTimeString("pt-BR")}`, margin, yPosition)
    yPosition += 10

    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("DADOS DA SOLICITAÇÃO", margin, yPosition)
    yPosition += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    doc.setFont("helvetica", "bold")
    doc.text("Tipo de Serviço:", margin, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(getTipoServicoLabel(tipoServico), margin + 35, yPosition)
    yPosition += 8

    if (tipoServico === "diligencia-neoenergia" && empreendimentoEscolhido) {
      doc.setFont("helvetica", "bold")
      doc.text("Empreendimento:", margin, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(getEmpreendimentoLabel(empreendimentoEscolhido), margin + 40, yPosition)
      yPosition += 8
    }

    if (tipoServico === "diligencia-neoenergia" && unis.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.text("Unidade(s):", margin, yPosition)
      yPosition += 6
      doc.setFont("helvetica", "normal")
      unis.forEach((uni, index) => {
        const label = useCustomUnidade ? uni : uni
        doc.text(`${index + 1}. ${label}`, margin + 5, yPosition)
        yPosition += 6
      })
      yPosition += 2
    }

    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("DESCRIÇÃO DETALHADA DA DEMANDA", margin, yPosition)
    yPosition += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    const descricaoLines = doc.splitTextToSize(descricao || "Não informado", maxWidth)
    doc.text(descricaoLines, margin, yPosition)
    yPosition += descricaoLines.length * 6 + 12

    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    const footerText = doc.splitTextToSize(
      "Este documento foi gerado automaticamente pelo sistema RioGest. Para mais informações, entre em contato com o departamento jurídico: (81) 99196-8022",
      maxWidth,
    )
    doc.text(footerText, margin, yPosition)

    doc.save(`resumo_da_solicitacao_${new Date().getTime()}.pdf`)
  }

  const generateProcuracaoNeoenergiaCompleta = (unis: string[]) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPos = 20

    // Local e data
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.text(`Recife, ${new Date().getDate()} de ${getMonthName(new Date().getMonth())} de ${new Date().getFullYear()}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 15

    // Título
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("PROCURAÇÃO PARTICULAR", pageWidth / 2, yPos, { align: "center" })
    yPos += 15

    // OUTORGANTE
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("OUTORGANTE:", margin, yPos)
    yPos += 6

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    const textoOutorgante = `RIO AVE INVESTIMENTOS LTDA, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº XX.XXX.XXX/0001-XX, com sede na Rua Professor Aloísio Pessoa de Araújo, nº 75, 14º andar, Boa Viagem, Recife/PE, CEP: 51.021-410 neste ato representada, na forma de seu Contrato Social, por seus Procuradores BIANCA XXXXXX BARRETO, brasileira, casada, contadora, portadora da Cédula de Identidade RG sob o nº x.xxx.xx XX/PE, inscrita no CPF/ME sob o n° xxx.xxx.xxx-xx e, CARLOS XXXXXX NETO, brasileiro, casado, contador, portador da cédula de identidade nº x.xxx.xx XX/PE, inscrito no CPF/ME sob o nº xxx.xxx.xxx-xx, ambos com domicílio profissional estabelecido na sede da sociedade que ora representa.`
    
    const linhasOutorgante = doc.splitTextToSize(textoOutorgante, maxWidth)
    doc.text(linhasOutorgante, margin, yPos)
    yPos += linhasOutorgante.length * 5 + 10

    // OUTORGADO
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("OUTORGADO:", margin, yPos)
    yPos += 6

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    const textoOutorgado = `FELIPE XXXXXX OLIVEIRA, brasileiro, solteiro, estagiário jurídico, portador da cédula de identidade RG nº x.xxx.xx XX/PE, inscrito no CPF/ME sob o nº xxx.xxx.xxx-xx, com domicílio profissional estabelecido na sede da sociedade que ora representa.`
    
    const linhasOutorgado = doc.splitTextToSize(textoOutorgado, maxWidth)
    doc.text(linhasOutorgado, margin, yPos)
    yPos += linhasOutorgado.length * 5 + 10

    // PODERES
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("PODERES:", margin, yPos)
    yPos += 6

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    
    const unidadesTexto = unis.map(u => useCustomUnidade ? u : u).join(", ")
    const empreendimentoTexto = getEmpreendimentoLabel(empreendimentoEscolhido)
    
    const textoPoderes = `Gerais e restritos para representar a OUTORGANTE, frente à NEOENERGIA, para tratar de todo e qualquer assunto, mais especificamente, para tratar de questões relativas a certidão de quitação, verificar questões acerca do fornecimento de energia débitos do imóvel, bem como realizar trocas de titularidade das salas ${unidadesTexto} do ${empreendimentoTexto}, situado na Av. Gov. Agamenon Magalhães, 4779 - Ilha do Leite, Recife - PE, 50070-160, cadastrado na Prefeitura Municipal de Recife, Estado de Pernambuco podendo, portanto, tudo requerer, assinar e protocolar, bem como praticar todos os demais atos necessários ao bom e fiel cumprimento deste mandato.`
    
    const linhasPoderes = doc.splitTextToSize(textoPoderes, maxWidth)
    doc.text(linhasPoderes, margin, yPos)
    yPos += linhasPoderes.length * 5 + 25

    // Linhas de assinatura
    const assinaturaY = yPos
    doc.line(margin, assinaturaY, margin + 60, assinaturaY)
    doc.line(pageWidth - margin - 60, assinaturaY, pageWidth - margin, assinaturaY)
    
    doc.setFontSize(9)
    doc.text("RIO AVE INVESTIMENTOS LTDA", margin + 30, assinaturaY + 5, { align: "center" })

    doc.save(`procuracao_neoenergia_${new Date().getTime()}.pdf`)
  }

  const getMonthName = (month: number) => {
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
                   "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    return months[month]
  }

  const generateOutrosDocumentosPDF = (unis: string[]) => {
    const docCNH = new jsPDF()
    const pageWidth = docCNH.internal.pageSize.getWidth()
    const margin = 20

    docCNH.setFont("helvetica", "bold")
    docCNH.setFontSize(16)
    docCNH.text("CARTEIRA NACIONAL DE HABILITAÇÃO", pageWidth / 2, 20, { align: "center" })

    docCNH.setFontSize(12)
    docCNH.text("REPÚBLICA FEDERATIVA DO BRASIL", pageWidth / 2, 30, { align: "center" })

    docCNH.setFontSize(10)
    docCNH.text(`Nº: ${Math.floor(Math.random() * 100000000000)}`, margin, 45)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("NOME:", margin, 60)
    docCNH.setFont("helvetica", "normal")
    docCNH.text("SOLICITANTE DO SISTEMA RIOGEST", margin + 20, 60)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("CPF:", margin, 70)
    docCNH.setFont("helvetica", "normal")
    docCNH.text("000.000.000-00", margin + 20, 70)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("DATA DE NASCIMENTO:", margin, 80)
    docCNH.setFont("helvetica", "normal")
    docCNH.text("01/01/1990", margin + 50, 80)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("CATEGORIA:", margin, 90)
    docCNH.setFont("helvetica", "normal")
    docCNH.text("AB", margin + 30, 90)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("DATA DE EMISSÃO:", margin, 100)
    docCNH.setFont("helvetica", "normal")
    docCNH.text(new Date().toLocaleDateString("pt-BR"), margin + 45, 100)

    docCNH.setFont("helvetica", "bold")
    docCNH.text("VALIDADE:", margin, 110)
    docCNH.setFont("helvetica", "normal")
    const validade = new Date()
    validade.setFullYear(validade.getFullYear() + 5)
    docCNH.text(validade.toLocaleDateString("pt-BR"), margin + 30, 110)

    docCNH.setFontSize(8)
    docCNH.setFont("helvetica", "italic")
    docCNH.text("Documento fictício gerado para fins de solicitação - RioGest", margin, 140)
    docCNH.text("Contato: (81) 99196-8022", margin, 148)

    docCNH.save(`cnh_${new Date().getTime()}.pdf`)

    // Procuração Patrimonial
    setTimeout(() => {
      const docProcPatrimonial = new jsPDF()
      const maxWidth = pageWidth - 2 * margin
      let yPos = 20

      docProcPatrimonial.setFont("helvetica", "bold")
      docProcPatrimonial.setFontSize(16)
      docProcPatrimonial.text("PROCURAÇÃO PATRIMONIAL", pageWidth / 2, yPos, { align: "center" })
      yPos += 15

      docProcPatrimonial.setFontSize(10)
      docProcPatrimonial.text("RioGest - Sistema de Gestão Jurídica", pageWidth / 2, yPos, { align: "center" })
      yPos += 15

      docProcPatrimonial.setFont("helvetica", "normal")
      docProcPatrimonial.setFontSize(10)

      const textoProcuracao = `Pelo presente instrumento particular de PROCURAÇÃO PATRIMONIAL, o(a) OUTORGANTE, devidamente identificado(a), nomeia e constitui como seu(sua) bastante PROCURADOR(A) a empresa RioGest Gestão Jurídica, inscrita no CNPJ sob nº 00.000.000/0001-00, com sede na Rua Exemplo, 123, Recife - PE, a quem confere poderes específicos para:

1. Representar o outorgante perante órgãos públicos e privados em assuntos relacionados aos empreendimentos listados;

2. Assinar documentos, contratos e termos de responsabilidade em nome do outorgante;

3. Protocolar e acompanhar processos administrativos e judiciais relacionados aos imóveis;

4. Requerer certidões, alvarás e demais documentações necessárias;

5. Praticar todos os atos necessários ao fiel cumprimento do presente mandato.`

      const linhasProcuracao = docProcPatrimonial.splitTextToSize(textoProcuracao, maxWidth)
      docProcPatrimonial.text(linhasProcuracao, margin, yPos)
      yPos += linhasProcuracao.length * 5 + 15

      if (empreendimentoEscolhido && unis.length > 0) {
        docProcPatrimonial.setFont("helvetica", "bold")
        docProcPatrimonial.text("EMPREENDIMENTO:", margin, yPos)
        yPos += 6
        docProcPatrimonial.setFont("helvetica", "normal")
        docProcPatrimonial.text(getEmpreendimentoLabel(empreendimentoEscolhido), margin + 5, yPos)
        yPos += 10

        docProcPatrimonial.setFont("helvetica", "bold")
        docProcPatrimonial.text("UNIDADES:", margin, yPos)
        yPos += 6
        docProcPatrimonial.setFont("helvetica", "normal")
        unis.forEach((uni, index) => {
          docProcPatrimonial.text(`${index + 1}. ${uni}`, margin + 5, yPos)
          yPos += 5
        })
        yPos += 10
      }

      docProcPatrimonial.text(`Recife, ${new Date().toLocaleDateString("pt-BR")}`, margin, yPos)
      yPos += 20

      docProcPatrimonial.line(margin, yPos, margin + 70, yPos)
      yPos += 5
      docProcPatrimonial.setFontSize(8)
      docProcPatrimonial.text("OUTORGANTE", margin + 15, yPos)

      yPos += 15
      docProcPatrimonial.setFont("helvetica", "italic")
      const footerText = docProcPatrimonial.splitTextToSize(
        "Este documento foi gerado automaticamente pelo sistema RioGest. Para mais informações, entre em contato com o departamento jurídico: (81) 99196-8022",
        maxWidth,
      )
      docProcPatrimonial.text(footerText, margin, yPos)

      docProcPatrimonial.save(`procuracao_patrimonial_${new Date().getTime()}.pdf`)
    }, 300)
  }

  const getTipoServicoLabel = (value: string) => {
    const labels: Record<string, string> = {
      "analise-parecer": "Análise/Parecer Jurídico",
      "termo-personalizacao": "Termo de Personalização",
      "diligencia-neoenergia": "Diligência Neoenergia",
      "diligencia-compesa": "Diligência Compesa",
      "diligencia-recife": "Diligência Prefeitura do Recife",
      "diligencia-jaboatao": "Diligência Prefeitura de Jaboatão dos Guararapes",
      "diligencia-cabo": "Diligência Prefeitura do Cabo de Santo Agostinho",
      "despacho-tribunal": "Despacho de Processo no Tribunal de Justiça",
    }
    return labels[value] || value
  }

  const getEmpreendimentoLabel = (value: string) => {
    const labels: Record<string, string> = {
      "isaac-newton": "Empresarial Isaac Newton",
      "charles-darwin": "Empresarial Charles Darwin",
      "thomas-edison": "Empresarial Thomas Edison",
    }
    return labels[value] || value
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8a] p-2">
                <ThemisLogo className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-slate-900">RioGest</h1>
                <p className="text-sm text-slate-600">Sistema de Gestão Jurídica</p>
              </div>
            </div>
            <Link href="/login">
              <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Solicitações</h2>
              <p className="mt-1 text-slate-600">Preencha os dados para criar uma nova solicitação</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tipo-servico"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <ThemisLogo className="h-4 w-4 text-[#1e3a5f]" />
                        Tipo do Serviço
                      </Label>
                      <Select value={tipoServico} onValueChange={setTipoServico}>
                        <SelectTrigger id="tipo-servico" className="h-12 bg-slate-50">
                          <SelectValue placeholder="Selecione o tipo de serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analise-parecer">Análise/Parecer Jurídico</SelectItem>
                          <SelectItem value="termo-personalizacao">Termo de Personalização</SelectItem>
                          <SelectItem value="diligencia-neoenergia">Diligência Neoenergia</SelectItem>
                          <SelectItem value="diligencia-compesa">Diligência Compesa</SelectItem>
                          <SelectItem value="diligencia-recife">Diligência Prefeitura do Recife</SelectItem>
                          <SelectItem value="diligencia-jaboatao">
                            Diligência Prefeitura de Jaboatão dos Guararapes
                          </SelectItem>
                          <SelectItem value="diligencia-cabo">
                            Diligência Prefeitura do Cabo de Santo Agostinho
                          </SelectItem>
                          <SelectItem value="despacho-tribunal">Despacho de Processo no Tribunal de Justiça</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {tipoServico === "diligencia-neoenergia" && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="empreendimento"
                          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                        >
                          <Building2 className="h-4 w-4" />
                          Empreendimento
                        </Label>
                        <Select value={empreendimentoEscolhido} onValueChange={setEmpreendimentoEscolhido}>
                          <SelectTrigger id="empreendimento" className="h-12 bg-slate-50">
                            <SelectValue placeholder="Selecione o empreendimento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="isaac-newton">Empresarial Isaac Newton</SelectItem>
                            <SelectItem value="charles-darwin">Empresarial Charles Darwin</SelectItem>
                            <SelectItem value="thomas-edison">Empresarial Thomas Edison</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {tipoServico === "diligencia-neoenergia" && empreendimentoEscolhido && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="unidade"
                          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                        >
                          <MapPin className="h-4 w-4" />
                          Unidade(s)
                        </Label>

                        <div className="flex items-center gap-2 mb-3">
                          <Checkbox
                            id="use-custom"
                            checked={useCustomUnidade}
                            onCheckedChange={(checked) => setUseCustomUnidade(checked as boolean)}
                          />
                          <Label htmlFor="use-custom" className="text-sm text-slate-600 cursor-pointer">
                            Digitar número da unidade
                          </Label>
                        </div>

                        {useCustomUnidade ? (
                          <Input
                            id="unidade-custom"
                            placeholder="Digite o número da unidade (ex: 1502, 1504)"
                            value={unidadeCustom}
                            onChange={(e) => setUnidadeCustom(e.target.value)}
                            className="h-12 bg-slate-50"
                          />
                        ) : (
                          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            {["1502", "1504", "1506", "1508"].map((uni) => (
                              <div key={uni} className="flex items-center gap-2">
                                <Checkbox
                                  id={uni}
                                  checked={unidades.includes(uni)}
                                  onCheckedChange={() => handleUnidadeToggle(uni)}
                                />
                                <Label htmlFor={uni} className="text-sm cursor-pointer">
                                  Unidade {uni}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="descricao" className="text-sm font-semibold text-slate-700">
                        Descrição Detalhada da Demanda
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva detalhadamente o problema ou solicitação..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="min-h-[120px] bg-slate-50"
                        required
                      />
                      <p className="text-xs text-slate-500">
                        Forneça o máximo de detalhes possível sobre sua solicitação
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#1e3a5f] text-base font-medium hover:bg-[#2d5a8a] sm:w-auto"
              >
                Criar Solicitação e Baixar PDFs
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-lg font-semibold text-slate-900">Resumo da Solicitação</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tipoServico ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-medium uppercase text-slate-500">Tipo de Serviço</p>
                      <p className="mt-1 font-medium text-slate-900">{getTipoServicoLabel(tipoServico)}</p>
                    </div>
                  ) : null}

                  {tipoServico === "diligencia-neoenergia" && empreendimentoEscolhido ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-medium uppercase text-slate-500">Empreendimento</p>
                      <p className="mt-1 font-medium text-slate-900">{getEmpreendimentoLabel(empreendimentoEscolhido)}</p>
                    </div>
                  ) : null}

                  {tipoServico === "diligencia-neoenergia" && (unidades.length > 0 || unidadeCustom) ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-medium uppercase text-slate-500">Unidade(s)</p>
                      {useCustomUnidade ? (
                        <p className="mt-1 font-medium text-slate-900">{unidadeCustom}</p>
                      ) : (
                        <div className="mt-1 space-y-1">
                          {unidades.map((uni, idx) => (
                            <p key={idx} className="font-medium text-slate-900">
                              • Unidade {uni}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}

                  {descricao ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-medium uppercase text-slate-500">Descrição</p>
                      <p className="mt-1 text-sm text-slate-700 line-clamp-3">{descricao}</p>
                    </div>
                  ) : null}

                  {!tipoServico && !empreendimentoEscolhido && !descricao && (
                    <div className="py-8 text-center text-sm text-slate-500">
                      Preencha os campos ao lado para ver o resumo
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
