"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Viewport {
	width: number;
	height: number;
}

interface ViewportProviderProps {
	children: React.ReactNode;
}

const ViewportContext = createContext<Viewport>({
	width: 0,
	height: 0,
});

export function ViewportProvider({ children }: ViewportProviderProps) {
	const [viewport, setViewport] = useState<Viewport>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		function handleResize() {
			setViewport({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<ViewportContext.Provider value={viewport}>
			{children}
		</ViewportContext.Provider>
	);
}

export function useViewport() {
	return useContext(ViewportContext);
}
