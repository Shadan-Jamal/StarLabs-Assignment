const Header = () => {
  return (
    <div className="w-full h-fit font-sans flex flex-col gap-3 items-center py-4 border-b-zinc-800 shadow-lg shadow-bla-300">
        <div>
            <h1 className="text-2xl font-semibold">Event Tracker</h1>
        </div>
        <div>
            <p>Check out local events like meetups, workshops, seminars hosted near you.</p>
        </div>
    </div>
  )
}

export default Header