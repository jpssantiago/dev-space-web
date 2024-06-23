const DEV_API_URL = "http://localhost:3333"
const PROD_API_URL = "https://api.devspace.joaosantiago.com.br"

export const api = process.env.NODE_ENV == "production" ? PROD_API_URL : DEV_API_URL