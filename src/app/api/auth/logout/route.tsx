import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export function GET(){
    cookies().set({
        name: "session",
        value: "",
        maxAge: 0,
        path: "/"
      })

      return NextResponse.json({message: "Logout"})
}