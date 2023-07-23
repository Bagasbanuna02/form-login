import { checkHasLogin } from "@/lib/check_auth";
import { Logout } from "@/modules/dashboard";
import { Box, Button, Flex } from "@mantine/core";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import toast from "react-simple-toasts";

export default async function Page() {
  if (!(await checkHasLogin())) {

    return redirect("/auth/signin") && toast("Anda Telah Logout")
  }
    return (
      <>
        <div>
          <pre>
            {JSON.stringify(cookies().getAll())}
            </pre>
          <Logout />
          
        </div>
      </>
    );
}
