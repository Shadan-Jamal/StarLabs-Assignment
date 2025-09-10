import {Routes, Route} from "react-router"
import Home from "./pages/Home"
import Event from "./pages/Event"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/event/:eventId" element={<Event />} />
    </Routes>
  )
}

export default App