import { AuthServerProvider } from "@src/components/auth";

interface Props {
	children: React.ReactNode;
}

export const metadata = {
	title: "Auth Page",
};

export default async function AuthLayout({ children }: Props) {
	return await AuthServerProvider({ children, role: ["admin"] });
}
