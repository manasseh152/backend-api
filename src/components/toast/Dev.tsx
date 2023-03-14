"use client";

import { useRef } from "react";

import type { Toast } from "@src/hooks/useToasts";
import { useToast } from "@src/hooks/useToasts";
import { createToastSchema } from "@src/validation/createToast";
import ToastTemplate from "./templates/Idk";

export default function DevToolsToast() {
	const { addToast } = useToast();

	const messageRef = useRef<HTMLInputElement>(null);
	const typeRef = useRef<HTMLSelectElement>(null);
	const lifespanRef = useRef<HTMLInputElement>(null);
	const removeableRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const input = createToastSchema.parse({
			message: messageRef.current?.value,
			type: typeRef.current?.value,
			lifespan: Number(lifespanRef.current?.value),
			removeable: removeableRef.current?.checked,
		});

		addToast({
			lifespan: input.lifespan,
			type: input.type,
			children(toast: Toast) {
				return (
					<>
						<div>
							<p>{input.message}</p>
							<p>id: {toast.id}</p>
						</div>
						<div>
							<p>Time to be removed at</p>
							<p>{toast.destroyAt}</p>
						</div>
						{input.removeable && (
							<button onClick={toast.destroy}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current flex-shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</>
				);
			},
		});
	}

	function handleTest() {
		addToast({
			type: "warning",
			lifespan: 0,
			children: ToastTemplate,
		});
	}

	return (
		<section className="flex flex-col gap-2 w-full max-w-md p-2">
			<h3 className="text-2xl">Toast devtools</h3>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-1 form-control"
			>
				<label className="label items-start flex-col">
					<span className="label-text">Message</span>
					<input
						className="input input-bordered w-full"
						type="text"
						ref={messageRef}
					/>
				</label>
				<label className="label items-start flex-col">
					<span className="label-text">Type</span>
					<select className="select select-bordered w-full" ref={typeRef}>
						<option value="default">Default</option>
						<option value="info">Info</option>
						<option value="success">Success</option>
						<option value="warning">Warning</option>
						<option value="error">Error</option>
					</select>
				</label>

				<label className="label items-start flex-col">
					<span className="label-text">Enter lifespan</span>
					<div className="input-group">
						<input
							className="input input-bordered w-full"
							type="number"
							ref={lifespanRef}
							placeholder="1000"
							min="0"
						/>
						<span>MS</span>
					</div>
				</label>
				<label className="label cursor-pointer">
					<span className="label-text">Removeable</span>
					<input
						type="checkbox"
						className="toggle toggle-primary"
						ref={removeableRef}
					/>
				</label>
				<button className="btn btn-primary" type="submit">
					Add Toast
				</button>
			</form>
			<button className="btn btn-primary" onClick={handleTest}>
				Test Toast
			</button>
		</section>
	);
}
