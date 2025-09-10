import Header from "../components/HomePage/Header"
import Options from "../components/HomePage/Options"
import EventGrid from "../components/HomePage/EventGrid"
import { Toaster } from "sonner"
import { useAppSelector } from "../store/hooks"
import { useMemo, useState } from "react"
import type { Events } from "../types/event"

const Home = () => {
  const [selectedType, setSelectedType] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const eventsStore = useAppSelector(s => s.event)

  const filtered: Events = useMemo(() => {
    return eventsStore.filter(e => {
      const typeOk = selectedType ? e.type === selectedType : true
      const locationOk = selectedLocation ? e.location === selectedLocation : true
      const dateOk = selectedDate ? e.date === selectedDate : true
      return typeOk && locationOk && dateOk
    })
  }, [eventsStore, selectedType, selectedLocation, selectedDate])

  return (
    <section className="w- min-w-[1440px] h-screen bg-slate-100">
        <Toaster richColors closeButton />
        <Header />

        <Options 
          selectedType={selectedType}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          onTypeChange={setSelectedType}
          onLocationChange={setSelectedLocation}
          onDateChange={setSelectedDate}
        />

        <EventGrid eventsOverride={filtered} />
    </section>
  )
}

export default Home