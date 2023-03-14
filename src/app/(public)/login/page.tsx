"use client";

import { useRef } from "react";
import { client } from "@src/util/axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const path = useSearchParams().get("path");

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		const res = await client.post("/auth/login", {
			email,
			password,
		});

		if (res.status !== 200) return;

		if (path) return router.push(path);

		return router.push("/");
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email
				<input type="email" ref={emailRef} />
			</label>
			<label>
				Password
				<input type="password" ref={passwordRef} />
			</label>
			<button type="submit">Login</button>
		</form>
	);
}
