import { Button } from "@mui/material";
import { deleteCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";

function Logout() {

    let router = useRouter();

    function handleClick() {
        deleteCookie("loggedIn");
        deleteCookie("role");
        deleteCookie("lastName");
        deleteCookie("firstName");
        deleteCookie("email");
        router.push("/");
    }

    return (
        <>
            <Button
                onClick={handleClick}
                variant="contained">
                    Logout
            </Button>
        </>
    )
}

export default Logout