import AddEvent from "./AddEvent"
import { useEffect, useState } from "react"
import { fetchLocations } from "../../utils/locations"
import { fetchTypes } from "../../utils/types"
import type { RootState } from "../../store/store"
import { useAppSelector } from "../../store/hooks"

export interface Option {
  id: string;
  name: string;
}

interface Props {
  selectedType: string;
  selectedLocation: string;
  selectedDate: string;
  onTypeChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onDateChange: (v: string) => void;
}

const Options = ({ 
  selectedType, 
  selectedLocation, 
  selectedDate, 
  onTypeChange, 
  onLocationChange, 
  onDateChange 
}: Props) => {
  const [locations, setLocations] = useState<Option[]>([])
  const [types, setTypes] = useState<Option[]>([])
  const eventsCount = useAppSelector((s: RootState) => s.event.length)

  useEffect(() => {
    const load = async () => {
      try{
        const [locs, tps] = await Promise.all([fetchLocations(), fetchTypes()])
        setLocations(locs)
        setTypes(tps)
      } catch(err) {
        console.log(err)
      }
    }
    load()
  }, [eventsCount])

  return (
    <div className="w-full h-fit border-b-[1px] border-b-gray-500/30 shadow-lg py-5 space-y-3 px-4 flex justify-around items-center">
        <div>
            <div className="w-fit flex justify-center items-center gap-4">
                <div id="type">
                    <select 
                    name="Type" 
                    className="rounded-sm px-1 border-1 border-black"
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}>
                        <option value="">All Types</option>
                        {types.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
                </div>

                <div id="date">
                    <input 
                    type="date" 
                    className="rounded-md border-1 px-2 text-black/50"
                    value={selectedDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    />
                </div>

                <div id="location">
                <select 
                    name="Location" 
                    className="rounded-sm px-1 border-1 border-black"
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}>
                        <option value="">All Locations</option>
                        {locations.map(l => (
                          <option key={l.id} value={l.name}>{l.name}</option>
                        ))}
                    </select>
                </div> 
            </div>
        </div>
        <div>
            <AddEvent />
        </div>
    </div>
  )
}

export default Options