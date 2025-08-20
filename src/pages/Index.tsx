import { SOSButton } from "@/components/SOSButton"
import { EmergencyContact } from "@/components/EmergencyContact"
import { EmergencyServices } from "@/components/EmergencyServices"
import { LocationStatus } from "@/components/LocationStatus"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Smartphone, MapPin, AlertTriangle } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emergency/10 rounded-lg">
              <Shield className="h-6 w-6 text-emergency" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SafeZone Alert</h1>
              <p className="text-sm text-muted-foreground">Emergency Response System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* SOS Section */}
        <section className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Emergency Assistance</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Press the button below to immediately alert your emergency contact with your location
            </p>
          </div>

          <div className="flex justify-center">
            <SOSButton />
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm text-left">
                <p className="font-medium text-warning-foreground">For Real Emergencies</p>
                <p className="text-muted-foreground">
                  In life-threatening situations, call emergency services (911) immediately
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Status Cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EmergencyContact />
          <LocationStatus />
          <EmergencyServices />
        </section>

        {/* Features Info */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emergency/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-emergency" />
                  </div>
                  <div>
                    <h3 className="font-semibold">1. Press SOS</h3>
                    <p className="text-sm text-muted-foreground">
                      Tap the emergency button when you need help
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">2. Share Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Your precise location is automatically included
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Smartphone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">3. Alert Sent</h3>
                    <p className="text-sm text-muted-foreground">
                      Emergency contact receives SMS with details
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built for emergency situations • Keep your emergency contact updated</p>
        </div>
      </footer>
    </div>
  )
}

export default Index