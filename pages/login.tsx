import React, { useEffect } from "react";
import Login from "components/Login";
import { useRouter } from "next/router";
import { getCookie, hasCookie } from "cookies-next";

function LoginPage() {
    let router = useRouter();

    useEffect(() => {
        if (!hasCookie("role")) {
            router.replace("/");
        }
    })

    return (
        <Login />
    )
}

export default LoginPage;