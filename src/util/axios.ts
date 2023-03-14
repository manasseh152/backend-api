import axios from "axios";

const server = axios.create({
	baseURL: "http://localhost:3001",
});

const client = axios.create({
	baseURL: "http://localhost:3000/api",
});

export { server, client };
