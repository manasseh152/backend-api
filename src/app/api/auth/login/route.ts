import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";
import { server } from "@src/util/axios";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export async function POST(request: NextRequest) {
	const { email, password } = loginSchema.parse(await request.json());

	const { data } = await server.post("/auth/login", {
		email,
		password,
	});

	return NextResponse.json(
		{
			message: data.message,
		},
		{
			headers: {
				"Set-Cookie": `session=${data.session}; Path=/; HttpOnly; SameSite=Lax`,
			},
		}
	);
}
