const app = document.querySelector("#oscar-app");
const form = document.querySelector("#oscar-form");

// Js enabled, show page contents
app.classList.remove("hidden");

form.addEventListener("submit", (e) => {
	// Prevent default redirect
	e.preventDefault();

	// GET request to fetch results
	fetch(`${e.target.action}?key=val&two=3&three='&four="`, { method: "GET" })
		.then((res) => res.text())
		.then((res) => {
			const results = document.querySelector("#results");

			// Display results
			results.innerHTML = res;
		});
});
