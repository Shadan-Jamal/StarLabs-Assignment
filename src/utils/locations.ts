import config from "../config/config"
import axios from "axios"
import type { Option } from "../components/HomePage/Options"

export const fetchLocations = async (): Promise<Option[]> => {
    const { data } = await axios.get<Option[]>(`${config.server_url}locations`)
    return data
}

export const addLocation = async (location: string): Promise<void> => {
    const current = await fetchLocations()
    const exists = current.some(item => item.name.toLowerCase() === location.toLowerCase())
    if (!exists) {
        const newLocation: Option = {
            id: String(current.length + 1),
            name: location
        }
        await axios.post(`${config.server_url}locations`, newLocation)
    }
}