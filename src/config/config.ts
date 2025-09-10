interface Config{
    server_url: string,
}

const config : Config = {
    server_url: import.meta.env.MODE === "development" 
    ? import.meta.env.VITE_SERVER_URL
    : ""
}
console.log(config, import.meta.env.SERVER_URL)
export default config;