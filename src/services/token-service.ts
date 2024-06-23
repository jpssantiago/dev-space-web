import { getCookie, setCookie, deleteCookie } from "cookies-next"

const cookieName = "ds-session-ck-tk"

export function getToken(): string | undefined {
    return getCookie(cookieName)
}

export function setToken(token: string) {
    setCookie(cookieName, token)
}

export function deleteToken() {
    deleteCookie(cookieName)
}