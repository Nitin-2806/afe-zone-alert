import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2, AlertTriangle } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export function LocationStatus() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        })
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  const getLocationAccuracy = (accuracy: number) => {
    if (accuracy <= 10) return "High"
    if (accuracy <= 100) return "Medium"
    return "Low"
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 location-spinner text-muted-foreground" />
            ) : error ? (
              <AlertTriangle className="h-5 w-5 text-warning" />
            ) : (
              <MapPin className="h-5 w-5 text-success" />
            )}
            <span className="font-medium">Location</span>
          </div>
          
          {isLoading && (
            <Badge variant="secondary">Getting location...</Badge>
          )}
          
          {error && (
            <Badge variant="destructive">Location unavailable</Badge>
          )}
          
          {location && (
            <Badge variant="secondary" className="bg-success/10 text-success">
              Accuracy: {getLocationAccuracy(location.accuracy)}
            </Badge>
          )}
        </div>

        {location && (
          <div className="mt-3 space-y-1">
            <p className="text-sm font-mono text-muted-foreground">
              {formatCoordinates(location.latitude, location.longitude)}
            </p>
            <p className="text-xs text-muted-foreground">
              ±{Math.round(location.accuracy)}m accuracy
            </p>
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm text-warning">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  )
}