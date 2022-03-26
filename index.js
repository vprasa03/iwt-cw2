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
	 * @param {string} formSelector id of the form element to process
	 * @param {string} outSelector id of the element where output should be displayed
	 */
	constructor(formSelector, outSelector) {
		// Find #{formID}
		this.form = document.querySelector(formSelector);
		// Find #{resultsID}
		this.out = document.querySelector(outSelector);

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
				// Display output
				this.out.innerHTML = res;
			})
			.catch((err) => console.error("ERROR: ", err));
	};
}

const form = new FormProcessor("#oscar-form", "#results");
