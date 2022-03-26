const app = document.querySelector('#oscar-app');

// Js enabled, show page contents
app.classList.remove('hidden');

/**
 * Process form and display results
 */
class OscarForm {
  yearEnabled = true;
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
    // Find #{formID}
    this.form = document.querySelector(formSelector);
    // Find #{resultsID}
    this.out = document.querySelector(outSelector);

    this.createYearInput('2010');
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
   * Creates checkbox and text inputs for Year
   * @param {string} defaultVal default value for year text input
   */
  createYearInput = (defaultVal) => {
    this.year = defaultVal;

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
    });
    yearInput.addEventListener('input', (e) => {
      this.year = e.target.value.trim();
    });

    this.form.appendChild(yearCheckbox);
    this.form.appendChild(yearInput);
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

    this.form.appendChild(categoryCheckbox);
    this.form.appendChild(categoryInput);
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

    this.form.appendChild(nomineeCheckbox);
    this.form.appendChild(nomineeInput);
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

    this.form.appendChild(infoCheckbox);
    this.form.appendChild(infoInput);
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

    this.form.appendChild(allRadio);
    this.form.appendChild(winRadio);
    this.form.appendChild(lossRadio);
  };

  createSubmitBtn = () => {
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'View Data';

    this.form.appendChild(button);
  };

  onSubmit = (event) => {
    // Prevent default redirect
    event.preventDefault();

    // Prepare URL parameters
    let urlParams = '?'.concat('won=', this.won);
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
