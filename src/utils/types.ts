import config from "../config/config"
import axios from "axios"
import type { Option } from "../components/HomePage/Options"

export const fetchTypes = async (): Promise<Option[]> => {
    const { data } = await axios.get<Option[]>(`${config.server_url}types`)
    return data
}

export const addType = async (type: string): Promise<void> => {
    const current = await fetchTypes()
    const exists = current.some(item => item.name.toLowerCase() === type.toLowerCase())
    if (!exists) {
        const newType: Option = {
            id: String(current.length + 1),
            name: type
        }
        await axios.post(`${config.server_url}types`, newType)
    }
}
