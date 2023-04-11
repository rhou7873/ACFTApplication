import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedPath = new Map<string, string[]>(Object.entries({
    "admin": ["/admin", "/register/grader"],
    "grader": ["/grader", "/register/soldier"],
    "soldier": ["/soldier"]
}));

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const loggedIn = request.cookies.get("loggedIn") !== undefined;
    // const role = request.cookies.get("role")?.value.toLowerCase() as string;
    // const goingToLogin = request.nextUrl.pathname === "/";
    
    // if (!goingToLogin && !loggedIn) {
    //     // Trying to go somewhere other than login screen when not logged in
    //     console.log("here");
    //     console.log("loggedIn cookie value: " + request.cookies.get("loggedIn")?.toString());
    //     return NextResponse.redirect(new URL("/", request.url))
    // } else if (goingToLogin && loggedIn) {
    //     // Trying to go to login screen when already logged in
    //     return NextResponse.redirect(new URL(`/${role}`, request.url));
    // } 
    
    // // Check if request URL is an authorized path
    // let authorized: boolean = false;
    // if (allowedPath.get(role) !== undefined) {
    //     for (let path of allowedPath.get(role) as string[]) {
    //         if (request.nextUrl.pathname.startsWith(path)) {
    //             authorized = true;
    //             break;
    //         }
    //     }
    // }

    // if (!goingToLogin && !authorized) {
    //     // Trying to go somewhere user is not authorized to go
    //     return NextResponse.redirect(request.nextUrl.origin);
    // }

    return NextResponse.next();
}


export const config = {
    matcher: [ // Matching paths that execute middleware()
        "/soldier/:path*", 
        "/grader/:path*", 
        "/admin/:path*", 
        "/register/:path*", 
        "/"
    ]
}