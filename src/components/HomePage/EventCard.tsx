import { Link } from "react-router"
import type { Event } from "../../types/event"
import {motion} from "motion/react"

const EventCard = ({
    id,
    date,
    location,
    title,
    type
} : Event) => {
    console.log(date)
  return (
    <motion.div
    initial={{opacity: 0, y: 8}}
    animate={{opacity: 1, y: 0, transition: {duration: 0.7, ease: "easeOut"}}}
    whileHover={{y: -2}}
    key={id}
    className="min-h-[8em] w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="space-y-4 px-4 py-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start gap-3">
                <div id="title" className="w-full">
                    <h3 className="text-lg font-semibold leading-snug text-gray-900">{title}</h3>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">{type}</span>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 border border-gray-200"><span className="mr-1">📅</span>{date}</span>
                </div>
            </div>

            <div className="w-full flex justify-between items-center pt-2">
                <div id="location" className="text-sm text-gray-700 inline-flex items-center gap-1">
                    <span>📍</span>
                    <span className="font-medium">{location}</span>
                </div>
                <Link
                to={`/event/${id}`} 
                target="_blank"
                className="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white text-xs font-medium px-3 py-1.5 hover:bg-black transition-colors">
                    View details
                    <span>→</span>
                </Link>
            </div>
        </div>
    </motion.div>
  )
}

export default EventCard