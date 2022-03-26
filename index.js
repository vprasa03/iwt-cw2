const app = document.querySelector("#oscar-app");
// const form = document.querySelector("#oscar-form");

// Js enabled, show page contents
app.classList.remove("hidden");

/**
 * Process form and display results
 */
class FormProcessor {
	/**
	 * Constructor
	 * @param {string} formID id of the form element to process
	 * @param {string} resultsID id of the element where results are to be displayed
	 */
	constructor(formID, resultsID) {
		// Find #{formID}
		this.form = document.querySelector(formID);
		// Find #{resultsID}
		this.displayResults = document.querySelector(resultsID);

		// Add "submit" event listener
		this.form.addEventListener("submit", this.onSubmit);
	}

	onSubmit = (event) => {
		// Prevent default redirect
		event.preventDefault();

		// GET request to fetch results
		fetch(`${event.target.action}?year=9&category=port&info='`, {
			method: "GET",
		})
			.then((res) => res.text())
			.then((res) => {
				// Display results
				this.displayResults.innerHTML = res;
			})
			.catch((err) => console.error("ERROR: ", err));
	};
}

const form = new FormProcessor("#oscar-form", "#results");
