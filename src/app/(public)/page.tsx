import { server } from "@src/util/axios";

async function getRes() {
	const { data } = await server.get("/health");
	return data;
}

export default async function Home() {
	const data = await getRes();
	return (
		<main>
			<h1>Home</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</main>
	);
}
