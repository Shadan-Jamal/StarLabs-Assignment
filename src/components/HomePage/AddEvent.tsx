import { useState } from "react"
import { toast } from "sonner"
import type { Event } from "../../types/event";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addEvent } from "../../store/features/movies/eventSlice";
import axios from "axios";
import config from "../../config/config";
import { addLocation } from "../../utils/locations";
import { addType } from "../../utils/types";

interface Props {
    isOpen: boolean;
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEvent = () => {
    const [modal, openModal] = useState(false)
  return (
    <>
    <div className="w-fit">
        <button
        onClick={() => openModal(true)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
        >
            Add Event
        </button>
    </div>
    <AddEventModal 
    isOpen={modal}
    openModal={openModal} />
    </>
  )
}

const AddEventModal = ({isOpen, openModal} : Props) => {
    const events = useAppSelector((state) => state.event)
    const dispath = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>
        const title = String(entries.title || "")
        const type = String(entries.type || "")
        const date = String(entries.date || "")
        const location = String(entries.location || "")
        const host = String(entries.host || "")
        const description = String(entries.description || "")

        const payload: Event = {
            id: String(events.length + 1),
            title,
            type,
            date,
            location,
            host,
            description
        }

        try{
            // ensure location and type lists are up to date
            if (location) await addLocation(location)
            if (type) await addType(type)

            const add = await axios.post(`${config.server_url}events`, payload)
            dispath(addEvent(payload))
            console.log(add)
            toast.success("Event added")
        }
        catch(err){
            toast.error("Error submitting event")
        }
        finally{
            openModal(false)
        }
    }
    
    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) openModal(false)
        }
    
    if(!isOpen) return null
    return (
        <div 
        onClick={handleBackdrop}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Add Event</h2>
                    <button
                        onClick={() => openModal(false)}
                        className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close"
                    >X</button>
                </div>
                <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input 
                            name="title"
                            required 
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <input 
                            name="type"
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input name="location" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
                            <input name="host" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button type="button" onClick={() => openModal(false)} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button type="submit" className=" cursor-pointer px-4 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Save Event</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEvent