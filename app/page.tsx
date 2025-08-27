import { PatientWhisperForm } from "@/components/patient-whisper-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{"INFINITY HELIX"}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get clear, simple explanations of your medical reports and prescriptions. We translate complex medical
            language into easy-to-understand insights.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🧾</span>
              </div>
              <CardTitle className="text-lg">Lab Report Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upload your lab results and get clear explanations of what each value means for your health.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">💊</span>
              </div>
              <CardTitle className="text-lg">Prescription Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Understand your medications, their purposes, and how they help your specific condition.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🧠</span>
              </div>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized guidance on follow-up care, lifestyle changes, and when to contact your doctor.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <PatientWhisperForm />

        {/* Disclaimer */}
        <Card className="mt-8 border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <span>⚠️</span>
              Important Medical Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This tool provides educational information only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always consult your healthcare provider for medical concerns and before making
              any changes to your treatment plan.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
