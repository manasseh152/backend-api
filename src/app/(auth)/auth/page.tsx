export default function AuthPage() {
	return (
		<section>
			<h3>Auth Page</h3>
			<p>
				This page is protected by a custom authentication check. If you are not
				logged in, you will be redirected to the login page. If you are logged
				in, but not authorized, you will be redirected to the home page.
			</p>
		</section>
	);
}
