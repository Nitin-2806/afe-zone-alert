import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Edit, Save, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Contact {
  name: string
  phone: string
}

export function EmergencyContact() {
  const [contact, setContact] = useState<Contact>(() => {
    const saved = localStorage.getItem('emergency-contact')
    return saved ? JSON.parse(saved) : { name: '', phone: '' }
  })
  const [isEditing, setIsEditing] = useState(!contact.name || !contact.phone)
  const [tempContact, setTempContact] = useState(contact)

  const saveContact = () => {
    if (!tempContact.name.trim() || !tempContact.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and phone number",
        variant: "destructive"
      })
      return
    }

    setContact(tempContact)
    localStorage.setItem('emergency-contact', JSON.stringify(tempContact))
    setIsEditing(false)
    toast({
      title: "Contact Saved",
      description: "Emergency contact has been updated",
    })
  }

  const cancelEdit = () => {
    setTempContact(contact)
    setIsEditing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Phone className="h-5 w-5" />
          Emergency Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Contact name"
                value={tempContact.name}
                onChange={(e) => setTempContact({ ...tempContact, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={tempContact.phone}
                onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveContact} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="w-fit">
              <Phone className="h-3 w-3 mr-1" />
              Ready for emergency
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}