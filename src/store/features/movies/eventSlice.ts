import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Events, Event } from "../../../types/event";

const initialState: Events = []

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        storeEvents: (_state, action: PayloadAction<Events>) => {
            return action.payload
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.push(action.payload)
        }
    }
})

export const {storeEvents, addEvent} = eventSlice.actions
export default eventSlice.reducer