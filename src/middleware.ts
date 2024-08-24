import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const key = process.env.jwt_secret;
  let url = req.nextUrl.clone();
  console.log(url, "url1");
  const token = await getToken({ req, secret: key });
  console.log("token>>>>>>>>>>>>>>>>>>>>", token)
  // await fetch(`${process.env.BASE_URI}api/database`, { method: 'GET' })
  //   .then((response) => response.json())
  //   .then((data) => { console.log("in middleware data", data) }

  //   )
  //   .catch((error) => { console.error('Error===?:', error) }

  //   );

  if (nextUrl.pathname == "/") {
    if (token) {
      url.pathname = `/pos`;
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
