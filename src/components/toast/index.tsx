"use client";
import { useToast } from "@src/hooks/useToasts";

import Toast from "./Toast";

export default function ToastContainer() {
	const { toasts } = useToast();

	return (
		<>
			{toasts.length > 0 && (
				<div className="toast toast-center w-full sm:max-w-sm sm:toast-end sm:items-end">
					{toasts.map(toast => (
						<Toast key={toast.id} {...toast} />
					))}
				</div>
			)}
		</>
	);
}
