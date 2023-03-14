import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Check if the request is from a client
	if (request.headers.get("user-agent")) {
		const requestHeaders = new Headers(request.headers);

		// Store current request pathname in a custom header
		requestHeaders.set("x-pathname", request.nextUrl.pathname);

		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	}
}
