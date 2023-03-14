"use client";

import type { Toast } from "@src/hooks/useToasts";

export default function ToastIdk(toast: Toast) {
	return (
		<>
			<span className="font-bold">
				Are you sure you want to delete this item?
			</span>
			<div className="flex gap-3">
				<button className="btn btn-error" onClick={toast.destroy}>
					Delete
				</button>
				<button className="btn btn-info" onClick={toast.destroy}>
					Cancel
				</button>
			</div>
		</>
	);
}
