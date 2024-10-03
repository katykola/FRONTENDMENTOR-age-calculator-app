// Gather all input fields
let inputsField = document.querySelectorAll('.field-input');
inputsField = Array.from(inputsField);

// Gather labels and input fields for day, month, and year
const labelDay = document.querySelector('label[for="day"]');
const labelMonth = document.querySelector('label[for="month"]');
const labelYear = document.querySelector('label[for="year"]');

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

// Gather error message elements
const invalidDayMessage = document.getElementById('dayInvalidMessage');
const invalidMonthMessage = document.getElementById('monthInvalidMessage');
const invalidYearMessage = document.getElementById('yearInvalidMessage');

// Gather outcome elements
const outcomeDays = document.getElementById('outcomeDays');
const outcomeMonths = document.getElementById('outcomeMonths');
const outcomeYears = document.getElementById('outcomeYears');

const btn = document.querySelector('.arrow-btn');

// Remove arrow keys on number inputs and handle placeholder restoration
inputsField.forEach(inputField => {
    // Prevent scrolling with arrow keys in number input
    inputField.addEventListener('keydown', function (e) {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
    });

    const defaultPlaceholder = inputField.placeholder;

    inputField.addEventListener('focus', function() {
        inputField.placeholder = '';
    });

    inputField.addEventListener('blur', function() {
        if (inputField.value === '') {
            inputField.placeholder = defaultPlaceholder;
        }
    });
});

// Disable typing when reaching a certain number of characters, but allow specific keys
inputDay.addEventListener('keydown', function(event) {
    inputLengthInvalid(event, 2);
});

inputMonth.addEventListener('keydown', function(event) {
    inputLengthInvalid(event, 2);
});

inputYear.addEventListener('keydown', function(event) {
    inputLengthInvalid(event, 4);
});

function inputLengthInvalid(event, inputCharactersNumber) {
    const inputValue = event.target.value;
    if (inputValue.length >= inputCharactersNumber && !isAllowedKey(event)) {
        event.preventDefault();
    }
}

function isAllowedKey(event) {
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'];
    return allowedKeys.includes(event.key);
}

// Check if the year is in the past
const currentYear = new Date().getFullYear();

function yearIsInThePast() {
    let inputYearValue = parseInt(inputYear.value);
    if (inputYearValue > currentYear) {
        invalidYearMessage.style.display = 'inherit';
        inputYear.classList.remove('input-valid');
        inputYear.classList.add('input-invalid');
        labelYear.classList.remove('label-valid');
        labelYear.classList.add('label-invalid');
        return false;
    } else {
        invalidYearMessage.style.display = 'none';
        inputYear.classList.remove('input-invalid');
        inputYear.classList.add('input-valid');
        labelYear.classList.remove('label-invalid');
        labelYear.classList.add('label-valid');
        return true;
    }
}

// Check if the year is not empty
function isEmptyYear() {
    if (inputYear.value === '') {
        inputYear.classList.remove('input-valid');
        inputYear.classList.add('input-invalid');
        labelYear.classList.remove('label-valid');
        labelYear.classList.add('label-invalid');
        return false;
    } else {
        inputYear.classList.remove('input-invalid');
        inputYear.classList.add('input-valid');
        labelYear.classList.remove('label-invalid');
        labelYear.classList.add('label-valid');
        return true;
    }
}

// Check if the number of day is valid
function isValidDay() {
    let inputDayValue = parseInt(inputDay.value);
    if (inputDayValue > 31) {
        invalidDayMessage.style.display = 'inherit';
        inputDay.classList.remove('input-valid');
        inputDay.classList.add('input-invalid');
        labelDay.classList.remove('label-valid');
        labelDay.classList.add('label-invalid');
        return false;
    } else {
        invalidDayMessage.style.display = 'none';
        inputDay.classList.remove('input-invalid');
        inputDay.classList.add('input-valid');
        labelDay.classList.remove('label-invalid');
        labelDay.classList.add('label-valid');
        return true;
    }
}

// Check if the number of month is valid
function isValidMonth() {
    let inputMonthValue = parseInt(inputMonth.value);
    if (inputMonthValue > 12) {
        invalidMonthMessage.style.display = 'inherit';
        inputMonth.classList.remove('input-valid');
        inputMonth.classList.add('input-invalid');
        labelMonth.classList.remove('label-valid');
        labelMonth.classList.add('label-invalid');
        return false;
    } else {
        invalidMonthMessage.style.display = 'none';
        inputMonth.classList.remove('input-invalid');
        inputMonth.classList.add('input-valid');
        labelMonth.classList.remove('label-invalid');
        labelMonth.classList.add('label-valid');
        return true;
    }
}

// Validate inputs on blur
inputDay.addEventListener('blur', isValidDay); // The blur event in JavaScript is triggered when an element loses focus.
inputMonth.addEventListener('blur', isValidMonth);
inputYear.addEventListener('blur', function() {
    yearIsInThePast();
});

// Calculate the difference in years, months, and days from the input date to today
btn.addEventListener('click', function(event) {
    let isValid = true;
    if (!isEmptyYear()) isValid = false;
    if (!isValidDay()) isValid = false;
    if (!isValidMonth()) isValid = false;
    if (!yearIsInThePast()) isValid = false;

    if (isValid) { // Pokud jsou data validni
        let day = parseInt(inputDay.value);
        let month = parseInt(inputMonth.value);
        let year = parseInt(inputYear.value);

        function isValidDate(day, month, year) {
            const currentDate = new Date();
            const inputDate = new Date(year, month - 1, day);

            function isLeapYear(year) { // Funkce na zjisteni prechodneho roku
                return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            }

            return (
                !isNaN(inputDate.getTime()) &&
                inputDate.getDate() === day &&
                inputDate.getMonth() === month - 1 &&
                inputDate.getFullYear() === year &&
                inputDate <= currentDate &&
                !(month === 2 && day === 29 && !isLeapYear(year))
            );
        }

        if (isValidDate(day, month, year)) { // Pokud jsou data validni, spocitej rozdil
            calculateSinceTime(year, month, day);
        } else {
            invalidDayMessage.style.display = 'inherit';

            inputDay.classList.remove('input-valid');
            inputDay.classList.add('input-invalid');
            labelDay.classList.remove('label-valid');
            labelDay.classList.add('label-invalid');    
    
            inputMonth.classList.remove('input-valid');
            inputMonth.classList.add('input-invalid');
            labelMonth.classList.remove('label-valid');
            labelMonth.classList.add('label-invalid');
    
            inputYear.classList.remove('input-valid');
            inputYear.classList.add('input-invalid');
            labelYear.classList.remove('label-valid');
            labelYear.classList.add('label-invalid');
    
            outcomeDays.innerText = '--';
            outcomeMonths.innerText = '--';
            outcomeYears.innerText = '--';        
        }
        
    } else { // Pokud data nejsou validni

        inputDay.classList.remove('input-valid');
        inputDay.classList.add('input-invalid');
        labelDay.classList.remove('label-valid');
        labelDay.classList.add('label-invalid');    

        inputMonth.classList.remove('input-valid');
        inputMonth.classList.add('input-invalid');
        labelMonth.classList.remove('label-valid');
        labelMonth.classList.add('label-invalid');

        inputYear.classList.remove('input-valid');
        inputYear.classList.add('input-invalid');
        labelYear.classList.remove('label-valid');
        labelYear.classList.add('label-invalid');

        outcomeDays.innerText = '--';
        outcomeMonths.innerText = '--';
        outcomeYears.innerText = '--';
    }
    
    // Funkce na spocitani casu, ktery ubehl od zadaneho data
    function calculateSinceTime(year, month, day) {
        const currentDate = new Date(); // Ziska cas
        const inputDate = new Date(year, month - 1, day); // Ziska cas ve stejnem formatu z inputu ve formulari

        const difference = currentDate - inputDate; // Vypocita rozdil

        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

        outcomeDays.innerText = days; // Prida vysledek do textu
        outcomeMonths.innerText = months;
        outcomeYears.innerText = years;
    }
});
