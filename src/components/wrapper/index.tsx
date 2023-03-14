"use client";

import { ToastProvider } from "@src/hooks/useToasts";

interface WrapperProps {
	children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
	return <ToastProvider>{children}</ToastProvider>;
}
