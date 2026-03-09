import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";

const protectedRoutes = ["/"];
const authPages = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  console.log(token, user)

  if (user && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register",],
};
