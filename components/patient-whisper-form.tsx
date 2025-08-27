"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, FileText, Globe } from "lucide-react"

interface ExplanationResult {
  summary: string
  results: Array<{
    test: string
    value: string
    status: "normal" | "slightly-off" | "concerning"
    explanation: string
  }>
  medications: Array<{
    name: string
    purpose: string
    instructions?: string
  }>
  nextSteps: string[]
}

export function PatientWhisperForm() {
  const [labReport, setLabReport] = useState("")
  const [prescription, setPrescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ExplanationResult | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!labReport.trim() && !prescription.trim() && uploadedFiles.length === 0 && !websiteUrl.trim()) {
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResult: ExplanationResult = {
      summary:
        uploadedFiles.length > 0 || websiteUrl
          ? `I've analyzed your uploaded ${uploadedFiles.length > 0 ? "lab report files" : ""} ${websiteUrl ? "and website information" : ""}. Your results show mostly normal values with a few areas that need attention. Your doctor has prescribed medications to help manage your cholesterol and blood pressure.`
          : "Your lab results show mostly normal values with a few areas that need attention. Your doctor has prescribed medications to help manage your cholesterol and blood pressure.",
      results: [
        {
          test: "Total Cholesterol",
          value: "245 mg/dL",
          status: "slightly-off",
          explanation:
            "Your cholesterol is a bit higher than the ideal range (under 200). Think of cholesterol like oil in your bloodstream - too much can stick to your artery walls.",
        },
        {
          test: "Blood Pressure",
          value: "145/92 mmHg",
          status: "concerning",
          explanation:
            "Your blood pressure is elevated. This means your heart is working harder than it should to pump blood through your body.",
        },
        {
          test: "Blood Sugar",
          value: "95 mg/dL",
          status: "normal",
          explanation: "Your blood sugar level is perfectly normal, which is great for your overall health.",
        },
      ],
      medications: [
        {
          name: "Atorvastatin 20mg",
          purpose:
            "This medication helps lower your cholesterol by reducing the amount your liver produces. It's like having a helper that tells your body to make less of the waxy substance that can clog your arteries.",
          instructions: "Take once daily with dinner",
        },
        {
          name: "Lisinopril 10mg",
          purpose:
            "This helps lower your blood pressure by relaxing your blood vessels, making it easier for your heart to pump blood throughout your body.",
          instructions: "Take once daily in the morning",
        },
      ],
      nextSteps: [
        "Schedule a follow-up appointment in 3 months to check your progress",
        "Consider a heart-healthy diet with less saturated fat and more vegetables",
        "Aim for 30 minutes of moderate exercise most days of the week",
        "Monitor your blood pressure at home if possible",
      ],
    }

    setResult(mockResult)
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-primary"
      case "slightly-off":
        return "text-accent"
      case "concerning":
        return "text-destructive"
      default:
        return "text-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-primary/10 text-primary"
      case "slightly-off":
        return "bg-accent/10 text-accent"
      case "concerning":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Medical Information</CardTitle>
          <CardDescription>Upload lab report files, paste text, or provide website URLs for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Lab Reports (PDF, Images, Documents)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop your lab reports</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG, DOC, DOCX, TXT files supported</p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website-url">Medical Website or Portal URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website-url"
                    type="url"
                    placeholder="https://patient-portal.example.com/results"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a URL to your patient portal or medical website for analysis
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lab-report">Lab Report (Text)</Label>
              <Textarea
                id="lab-report"
                placeholder="Or paste your complete lab report here..."
                value={labReport}
                onChange={(e) => setLabReport(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescription">Doctor's Prescription & Notes</Label>
              <Textarea
                id="prescription"
                placeholder="Paste your doctor's prescription, diagnosis, and any notes here..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="min-h-32"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                (!labReport.trim() && !prescription.trim() && uploadedFiles.length === 0 && !websiteUrl.trim())
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Your Information...
                </>
              ) : (
                "Get My Explanation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🧾</span>
                Summary of Your Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{result.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔍</span>
                What the Results Indicate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.results.map((item, index) => (
                <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{item.test}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{item.value}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💊</span>
                Your Medications Explained
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.medications.map((med, index) => (
                <div key={index} className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-foreground mb-2">{med.name}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{med.purpose}</p>
                  {med.instructions && (
                    <p className="text-xs text-accent font-medium">Instructions: {med.instructions}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🧠</span>
                What You Should Do Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
