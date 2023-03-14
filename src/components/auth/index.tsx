import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { server } from "@src/util/axios";

type State = "unauthorized" | "authorized" | "notloggedin";

type Role = "admin" | "user";

interface Props {
	children: React.ReactNode;
	role: Role[];
}

async function checkAuth(role: Role[]): Promise<State> {
	try {
		const session = cookies().get("session");
		if (!session) return "notloggedin";
		const data = await server.post("/auth/check", {
			session: session.value,
			role,
		});

		if (data) return "authorized";
		return "unauthorized";
	} catch (error) {
		console.log(error);
		return "unauthorized";
	}
}

export async function AuthServerProvider({ children, role }: Props) {
	const auth = await checkAuth(role);
	const path = headers().get("x-pathname") || "/";
	const redirectPath = new URLSearchParams({ path }).toString();

	if (auth === "notloggedin") {
		redirect("/login?" + redirectPath);
	}
	if (auth === "unauthorized") {
		redirect("/");
	}
	return <main>{children}</main>;
}
