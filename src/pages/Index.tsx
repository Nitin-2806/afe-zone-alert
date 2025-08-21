import { useState } from "react"
import { SOSButton } from "@/components/SOSButton"
import { EmergencyContact } from "@/components/EmergencyContact"
import { EmergencyServices } from "@/components/EmergencyServices"
import { LocationStatus } from "@/components/LocationStatus"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, MapPin, AlertTriangle, Settings, User, HelpCircle, Activity, Phone, MessageSquare } from "lucide-react"

const Index = () => {
  const [activeTab, setActiveTab] = useState("emergency")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emergency/10 rounded-lg">
                <Shield className="h-6 w-6 text-emergency" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SafeZone Alert</h1>
                <p className="text-sm text-muted-foreground">Emergency Response System</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              System Active
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6 mt-6">
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

            <section className="grid gap-4 md:grid-cols-3">
              <LocationStatus />
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-success" />
                    <div>
                      <h3 className="font-semibold">System Status</h3>
                      <p className="text-sm text-success">All systems operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-accent" />
                    <div>
                      <h3 className="font-semibold">Last Alert</h3>
                      <p className="text-sm text-muted-foreground">No recent alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Emergency Contacts</h2>
              <Button variant="outline">Add Contact</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <EmergencyContact />
              <EmergencyServices />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Location updated</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Emergency contact verified</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>SMS Alerts</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location Sharing</span>
                    <Badge variant="secondary">Always</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-Response</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Options
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold">Help & Support</h2>
            
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

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <details className="p-3 bg-muted/50 rounded-lg">
                  <summary className="font-medium cursor-pointer">How accurate is the location sharing?</summary>
                  <p className="text-sm text-muted-foreground mt-2">
                    Location accuracy depends on your device's GPS capabilities and can be accurate within 3-5 meters in optimal conditions.
                  </p>
                </details>
                <details className="p-3 bg-muted/50 rounded-lg">
                  <summary className="font-medium cursor-pointer">What happens if I accidentally press SOS?</summary>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can cancel the alert within 10 seconds. After that, the emergency message will be sent to your contacts.
                  </p>
                </details>
                <details className="p-3 bg-muted/50 rounded-lg">
                  <summary className="font-medium cursor-pointer">Can I add multiple emergency contacts?</summary>
                  <p className="text-sm text-muted-foreground mt-2">
                    Yes, you can add up to 5 emergency contacts who will all receive alerts when you press the SOS button.
                  </p>
                </details>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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