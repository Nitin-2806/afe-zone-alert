import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

interface RealTimeMessage {
  id: string
  sender_id: string
  receiver_id: string
  alert_id?: string
  message_type: 'alert' | 'location_update' | 'status_update'
  content?: string
  location_data?: LocationData
  created_at: string
}

export function useRealTimeLocation() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [messages, setMessages] = useState<RealTimeMessage[]>([])
  const [isTracking, setIsTracking] = useState(false)

  // Start real-time location tracking
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser doesn't support location services"
      })
      return
    }

    setIsTracking(true)
    
    // Get initial location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        }
        setCurrentLocation(locationData)
        
        // Send initial location update
        if (user) {
          sendLocationUpdate(locationData)
        }
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Location error",
          description: error.message
        })
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )

    // Watch position for real-time updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        }
        setCurrentLocation(locationData)
        
        // Send location update every 30 seconds or significant movement
        if (user) {
          sendLocationUpdate(locationData)
        }
      },
      (error) => {
        console.error('Location watch error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000 // Update every 30 seconds
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
      setIsTracking(false)
    }
  }

  // Send location update to emergency contacts
  const sendLocationUpdate = async (locationData: LocationData, alertId?: string) => {
    if (!user) return

    try {
      // Store location update in database
      const { error: locationError } = await supabase
        .from('location_updates')
        .insert({
          user_id: user.id,
          alert_id: alertId,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          accuracy: locationData.accuracy,
          timestamp: new Date(locationData.timestamp).toISOString()
        })

      if (locationError) {
        console.error('Error storing location update:', locationError)
        return
      }

      // Get user's emergency contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError)
        return
      }

      // Send real-time message to each emergency contact
      for (const contact of contacts || []) {
        const { error: messageError } = await supabase
          .from('real_time_messages')
          .insert({
            sender_id: user.id,
            receiver_id: contact.user_id, // This would need to be mapped to actual user IDs
            alert_id: alertId,
            message_type: 'location_update',
            content: `Location update from ${user.user_metadata?.full_name || user.email}`,
            location_data: JSON.parse(JSON.stringify(locationData))
          })

        if (messageError) {
          console.error('Error sending real-time message:', messageError)
        }
      }

    } catch (error) {
      console.error('Error in sendLocationUpdate:', error)
    }
  }

  // Send emergency alert with location
  const sendEmergencyAlert = async (message: string) => {
    if (!user || !currentLocation) {
      toast({
        variant: "destructive",
        title: "Cannot send alert",
        description: "Please enable location services first"
      })
      return
    }

    try {
      // Create emergency alert
      const { data: alertData, error: alertError } = await supabase
        .from('emergency_alerts')
        .insert({
          user_id: user.id,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          message: message,
          status: 'active'
        })
        .select()
        .single()

      if (alertError) {
        throw alertError
      }

      // Send location update with alert ID
      await sendLocationUpdate(currentLocation, alertData.id)

      // Get emergency contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)

      if (contactsError) {
        throw contactsError
      }

      // Send emergency messages to contacts
      for (const contact of contacts || []) {
        const { error: messageError } = await supabase
          .from('real_time_messages')
          .insert({
            sender_id: user.id,
            receiver_id: contact.user_id,
            alert_id: alertData.id,
            message_type: 'alert',
            content: `🚨 EMERGENCY ALERT: ${message}`,
            location_data: JSON.parse(JSON.stringify(currentLocation))
          })

        if (messageError) {
          console.error('Error sending emergency message:', messageError)
        }
      }

      toast({
        title: "Emergency alert sent!",
        description: "Your emergency contacts have been notified with your location."
      })

    } catch (error) {
      console.error('Error sending emergency alert:', error)
      toast({
        variant: "destructive",
        title: "Failed to send alert",
        description: "Please try again or contact emergency services directly."
      })
    }
  }

  // Set up real-time subscription for incoming messages
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('real-time-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'real_time_messages',
          filter: `receiver_id=eq.${user.id}`
        },
        (payload) => {
          const newMessage = payload.new as RealTimeMessage
          setMessages(prev => [...prev, newMessage])
          
          // Show notification for incoming messages
          if (newMessage.message_type === 'alert') {
            toast({
              title: "Emergency Alert Received",
              description: newMessage.content,
              variant: "destructive"
            })
          } else if (newMessage.message_type === 'location_update') {
            toast({
              title: "Location Update",
              description: newMessage.content
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, toast])

  return {
    currentLocation,
    messages,
    isTracking,
    startLocationTracking,
    sendLocationUpdate,
    sendEmergencyAlert
  }
}