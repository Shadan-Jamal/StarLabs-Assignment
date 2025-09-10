import type { Event } from "../../types/event"
import { toast } from "sonner"

interface Props {
  event?: Event
}

const EventDetails = ({ event }: Props) => {
  if (!event) return null
  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="h-28 w-full bg-gradient-to-r from-slate-100 via-indigo-50 to-white" />
        <div className="-mt-10 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">{event.type}</span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 border border-gray-200">📅 {event.date}</span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 border border-gray-200">📍 {event.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.success("Event joined!")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gray-900/70 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors"
              >
                RSVP
              </button>
            </div>
          </div>

          {event.description && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-gray-900 mb-2">About this event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {event.host && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Host</h3>
              <div className="text-sm text-gray-700">{event.host}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetails