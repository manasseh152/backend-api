import { cookies } from "next/headers";

export function GET() {
	return new Response(JSON.stringify({ message: "Hello World!" }));
}
