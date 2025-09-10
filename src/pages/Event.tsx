import EventDetails from "../components/EventPage/EventDetails"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import config from "../config/config"
import type { Event } from "../types/event"
import { Toaster } from "sonner"

const EventPage = () => {
  const { eventId } = useParams()
  const numericId = Number(eventId)

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${config.server_url}events/${numericId}`)
        if (isMounted) {
          setEvent(response.data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) setError("Failed to load event")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (!Number.isNaN(numericId)) fetchEvent()
    else {
      setError("Invalid event id")
      setLoading(false)
    }

    return () => { isMounted = false }
  }, [numericId])

  if (loading) return <div className="px-4 py-2 text-sm text-gray-600">Loading...</div>
  if (error) return <div className="px-4 py-2 text-sm text-red-600">{error}</div>

  return (
    <div>
      <Toaster richColors closeButton />
      <EventDetails event={event ?? undefined} />
      {!event && (
        <div className="px-4 py-2 text-sm text-red-600">Event not found.</div>
      )}
    </div>
  )
}

export default EventPage