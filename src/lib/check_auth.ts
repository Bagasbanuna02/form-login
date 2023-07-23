import { cookies } from "next/dist/client/components/headers";

export async function checkHasLogin() {
    const data = cookies().get("session")?.value

    const isCookie = data !== undefined && data !== ""

    return isCookie
}