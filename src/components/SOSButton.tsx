import { useState } from "react"
import { EmergencyButton } from "@/components/ui/emergency-button"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Check, Phone } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
}

export function SOSButton() {
  const [isActivating, setIsActivating] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

  const handleSOSActivation = async () => {
    const contact = localStorage.getItem('emergency-contact')
    
    if (!contact) {
      toast({
        title: "No Emergency Contact",
        description: "Please set up an emergency contact first",
        variant: "destructive"
      })
      return
    }

    const parsedContact = JSON.parse(contact)
    setIsActivating(true)

    try {
      // Get current location
      const location = await getCurrentLocation()
      
      // Simulate SMS sending (in real app, this would use native SMS API via Capacitor)
      await simulateSMSSend(parsedContact, location)
      
      setIsActivated(true)
      toast({
        title: "SOS Alert Sent!",
        description: `Emergency message sent to ${parsedContact.name}`,
      })

      // Reset after 5 seconds
      setTimeout(() => {
        setIsActivated(false)
      }, 5000)

    } catch (error) {
      toast({
        title: "SOS Failed",
        description: "Could not send emergency alert. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsActivating(false)
    }
  }

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
        },
        (error) => {
          // Still resolve with approximate location for demo
          resolve({
            latitude: 0,
            longitude: 0,
            accuracy: 0
          })
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      )
    })
  }

  const simulateSMSSend = async (contact: any, location: LocationData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const message = `🚨 EMERGENCY ALERT 🚨
${contact.name}, I need immediate help! 
Location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}
Time: ${new Date().toLocaleString()}
Sent from SafeZone Alert`

    console.log("Emergency SMS would be sent:", {
      to: contact.phone,
      message: message
    })
  }

  if (isActivated) {
    return (
      <EmergencyButton variant="success" size="xl" disabled>
        <div className="flex flex-col items-center gap-2">
          <Check className="h-8 w-8" />
          <span>SOS SENT</span>
        </div>
      </EmergencyButton>
    )
  }

  return (
    <EmergencyButton 
      size="xl" 
      onClick={handleSOSActivation}
      disabled={isActivating}
      className={isActivating ? "opacity-80" : ""}
    >
      <div className="flex flex-col items-center gap-2">
        {isActivating ? (
          <>
            <Phone className="h-8 w-8 animate-pulse" />
            <span>SENDING...</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-8 w-8" />
            <span>SOS</span>
          </>
        )}
      </div>
    </EmergencyButton>
  )
}