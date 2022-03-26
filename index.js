/**
 * Internet and Web Technologies Coursework-2
 * Submitted by Vignesh Prasad (13717879)
 */

const app = document.querySelector('#oscar-app');

// Js enabled, show page contents
app.classList.remove('hidden');

/**
 * Creates form, handles submit and displays results
 */
class OscarForm {
  yearEnabled = true;
  year = '';
  categoryEnabled = false;
  category = '';
  nomineeEnabled = false;
  nominee = '';
  infoEnabled = false;
  info = '';
  won = '';

  /**
   * Constructor
   * @param {string} formSelector id of the form element to process
   * @param {string} outSelector id of the element where output should be displayed
   */
  constructor(formSelector, outSelector) {
    // Find form element
    this.form = document.querySelector(formSelector);
    // Find display element
    this.out = document.querySelector(outSelector);

    this.createYearInput();
    this.createCategoryInput();
    this.createNomineeInput();
    this.createInfoInput();
    this.createWonInput();
    this.createSubmitBtn();

    // Add "submit" event listener
    this.form.addEventListener('submit', this.onSubmit);

    // Dispatch "submit" for initial display
    this.form.dispatchEvent(new Event('submit', { cancelable: true }));
  }

  /**
   * Append created elements to the given form element
   * @param {string} label Text to display
   * @param {string} forEl label.for value
   * @param {HTMLElement[]} children Array of created elements
   */
  addElementsToDOM = (labelText, forEl, children) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.forEl = forEl;

    const div = document.createElement('div');
    children
      .slice(0, 1)
      .concat(label, children.slice(1))
      .forEach((child) => {
        div.appendChild(child);
      });
    this.form.appendChild(div);
  };

  /**
   * Creates checkbox and text inputs for Year
   */
  createYearInput = () => {
    const yearCheckbox = document.createElement('input');
    yearCheckbox.type = 'checkbox';
    yearCheckbox.checked = this.yearEnabled;
    yearCheckbox.name = 'year-enabled';

    const yearInput = document.createElement('input');
    yearInput.disabled = false;
    yearInput.name = 'year';
    yearInput.value = this.year;

    yearCheckbox.addEventListener('change', (e) => {
      this.yearEnabled = e.target.checked;
      yearInput.disabled = !this.yearEnabled;
      if (!this.yearEnabled) {
        yearInput.value = '';
        this.year = '';
      }
    });
    yearInput.addEventListener('input', (e) => {
      this.year = e.target.value.trim();
    });

    this.addElementsToDOM('Year', yearCheckbox.name, [yearCheckbox, yearInput]);
  };

  /**
   * Creates checkbox and text inputs for Category
   */
  createCategoryInput = () => {
    const categoryCheckbox = document.createElement('input');
    categoryCheckbox.type = 'checkbox';
    categoryCheckbox.checked = this.categoryEnabled;
    categoryCheckbox.name = 'category-enabled';

    const categoryInput = document.createElement('input');
    categoryInput.disabled = true;
    categoryInput.name = 'category';
    categoryInput.value = this.category;

    categoryCheckbox.addEventListener('change', (e) => {
      this.categoryEnabled = e.target.checked;
      categoryInput.disabled = !this.categoryEnabled;
      if (!this.categoryEnabled) {
        categoryInput.value = '';
        this.category = '';
      }
    });
    categoryInput.addEventListener('input', (e) => {
      this.category = e.target.value.trim();
    });

    this.addElementsToDOM('Category', categoryCheckbox.name, [
      categoryCheckbox,
      categoryInput,
    ]);
  };

  /**
   * Creates checkbox and text inputs for Nominee
   */
  createNomineeInput = () => {
    const nomineeCheckbox = document.createElement('input');
    nomineeCheckbox.type = 'checkbox';
    nomineeCheckbox.checked = this.nomineeEnabled;
    nomineeCheckbox.name = 'nominee-enabled';

    const nomineeInput = document.createElement('input');
    nomineeInput.disabled = true;
    nomineeInput.name = 'nominee';
    nomineeInput.value = this.nominee;

    nomineeCheckbox.addEventListener('change', (e) => {
      this.nomineeEnabled = e.target.checked;
      nomineeInput.disabled = !this.nomineeEnabled;
      if (!this.nomineeEnabled) {
        nomineeInput.value = '';
        this.nominee = '';
      }
    });
    nomineeInput.addEventListener('input', (e) => {
      this.nominee = e.target.value;
    });

    this.addElementsToDOM('Nominee', nomineeCheckbox.name, [
      nomineeCheckbox,
      nomineeInput,
    ]);
  };

  /**
   * Creates checkbox and text inputs for Info
   */
  createInfoInput = () => {
    const infoCheckbox = document.createElement('input');
    infoCheckbox.type = 'checkbox';
    infoCheckbox.checked = this.infoEnabled;
    infoCheckbox.name = 'info-enabled';

    const infoInput = document.createElement('input');
    infoInput.disabled = true;
    infoInput.name = 'info';
    infoInput.value = this.info;

    infoCheckbox.addEventListener('change', (e) => {
      this.infoEnabled = e.target.checked;
      infoInput.disabled = !this.infoEnabled;
      if (!this.infoEnabled) {
        infoInput.value = '';
        this.info = '';
      }
    });
    infoInput.addEventListener('input', (e) => {
      this.info = e.target.value;
    });

    this.addElementsToDOM('Info', infoCheckbox.name, [infoCheckbox, infoInput]);
  };

  /**
   * Creates radio inputs for Won?
   */
  createWonInput = () => {
    const allRadio = document.createElement('input');
    allRadio.type = 'radio';
    allRadio.checked = true;
    allRadio.value = '';
    allRadio.name = 'win-loss';

    const winRadio = document.createElement('input');
    winRadio.type = 'radio';
    winRadio.checked = false;
    winRadio.value = 'yes';
    winRadio.name = 'win-loss';

    const lossRadio = document.createElement('input');
    lossRadio.type = 'radio';
    lossRadio.checked = false;
    lossRadio.value = 'no';
    lossRadio.name = 'win-loss';

    [allRadio, winRadio, lossRadio].forEach((element) => {
      element.addEventListener('change', (e) => {
        this.won = e.target.value;
        element.checked = true;
      });
    });

    const allLabel = document.createElement('label');
    allLabel.forEl = allRadio.value;
    allLabel.textContent = 'All';
    const winLabel = document.createElement('label');
    winLabel.forEl = winRadio.value;
    winLabel.textContent = 'Won';
    const lossLabel = document.createElement('label');
    lossLabel.forEl = lossRadio.value;
    lossLabel.textContent = 'Lost';

    const div = document.createElement('div');
    div.appendChild(allLabel);
    div.appendChild(allRadio);
    div.appendChild(winLabel);
    div.appendChild(winRadio);
    div.appendChild(lossLabel);
    div.appendChild(lossRadio);
    this.form.appendChild(div);
  };

  /**
   * Creates submit button
   */
  createSubmitBtn = () => {
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'View Data';

    this.form.appendChild(button);
  };

  /**
   * Form "submit" event handler
   * @param {Event} event
   */
  onSubmit = (event) => {
    // Prevent default redirect
    event.preventDefault();

    // Prepare URL parameters
    let urlParams = 'won='.concat(this.won);
    if (this.yearEnabled) urlParams = urlParams.concat('&year=', this.year);
    if (this.categoryEnabled)
      urlParams = urlParams.concat('&category=', this.category);
    if (this.nomineeEnabled)
      urlParams = urlParams.concat('&nominee=', this.nominee);
    if (this.infoEnabled) urlParams = urlParams.concat('&info=', this.info);

    console.log(event.target.action + urlParams);

    // GET request to fetch results
    fetch(window.location.href + 'oscars.php?' + urlParams, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((res) => {
        // Display output
        this.out.innerHTML = res;
      })
      .catch((err) => console.error('ERROR: ', err));
  };
}

const form = new OscarForm('#oscar-form', '#results');
