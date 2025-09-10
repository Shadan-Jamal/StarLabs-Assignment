import { useEffect, useMemo, useState } from "react"
import type { Events, Event } from "../../types/event"
import config from "../../config/config";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { storeEvents } from "../../store/features/movies/eventSlice";
import EventCard from "./EventCard";

interface Props {
    eventsOverride?: Events
}

const PER_PAGE = 12

const EventGrid = ({ eventsOverride }: Props) => {
    const eventsStore = useAppSelector((state) => state.event);
    const dispath  = useAppDispatch()
    const [page, setPage] = useState(1)

    // Fetch the events only if store is empty
    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const response = await axios.get(`${config.server_url}events`)
                const data: Events = response.data
                dispath(storeEvents(data))
            }
            catch(err){
                console.log(err)
            }
        }

        if (!eventsStore || eventsStore.length === 0) {
            fetchEvents()
        }
    },[dispath, eventsStore?.length])

    const list = eventsOverride ?? eventsStore

    // Reset page if list length changes and current page overflows
    useEffect(() => {
        setPage(1)
    }, [eventsOverride?.length, eventsStore?.length])

    const total = list?.length ?? 0
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
    const start = (page - 1) * PER_PAGE
    const end = start + PER_PAGE
    const pageItems = useMemo(() => (list ? list.slice(start, end) : []), [list, start, end])

    const canPrev = page > 1
    const canNext = page < totalPages

    return (
    <div className="w-full">
        <div 
        className="py-5 px-4 w-full grid grid-cols-3 place-content-start gap-5 md:gap-6 lg:gap-8">
            {pageItems && pageItems.map((event : Event) => (
                <EventCard
                key={event.id}
                {...event}
                />
            ))}
        </div>
        <div className="w-full flex items-center justify-center gap-3 pb-6">
            <button
                disabled={!canPrev}
                onClick={() => canPrev && setPage(p => Math.max(1, p - 1))}
                className={`px-3 py-1.5 text-sm rounded-md border ${canPrev ? "bg-white hover:bg-gray-50 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
            >Prev</button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <button
                disabled={!canNext}
                onClick={() => canNext && setPage(p => Math.min(totalPages, p + 1))}
                className={`px-3 py-1.5 text-sm rounded-md border ${canNext ? "bg-white hover:bg-gray-50 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
            >Next</button>
        </div>
    </div>
  )
}

export default EventGrid