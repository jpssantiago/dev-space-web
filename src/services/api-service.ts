const DEV_API_URL = "http://192.168.0.15:3333" // it needs to be the IPV4 address to work properly on mobile
const PROD_API_URL = "https://api-devspace.joaosantiago.com.br"

export const api = process.env.NODE_ENV == "production" ? PROD_API_URL : DEV_API_URL