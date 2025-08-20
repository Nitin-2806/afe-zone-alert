import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Shield, Truck, Flame } from "lucide-react"

interface EmergencyService {
  name: string
  number: string
  icon: React.ReactNode
  color: string
}

const emergencyServices: EmergencyService[] = [
  {
    name: "Police",
    number: "911",
    icon: <Shield className="h-5 w-5" />,
    color: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  {
    name: "Ambulance",
    number: "911",
    icon: <Truck className="h-5 w-5" />,
    color: "bg-red-600 hover:bg-red-700 text-white"
  },
  {
    name: "Fire Department",
    number: "911",
    icon: <Flame className="h-5 w-5" />,
    color: "bg-orange-600 hover:bg-orange-700 text-white"
  }
]

export function EmergencyServices() {
  const handleEmergencyCall = (service: EmergencyService) => {
    const phoneUrl = `tel:${service.number}`
    window.open(phoneUrl, '_self')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Emergency Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {emergencyServices.map((service) => (
            <Button
              key={service.name}
              onClick={() => handleEmergencyCall(service)}
              className={`w-full justify-start gap-3 h-12 ${service.color}`}
              variant="secondary"
            >
              {service.icon}
              <div className="flex-1 text-left">
                <div className="font-semibold">{service.name}</div>
                <div className="text-sm opacity-90">{service.number}</div>
              </div>
              <Phone className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            For immediate life-threatening emergencies, call directly
          </p>
        </div>
      </CardContent>
    </Card>
  )
}