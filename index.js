/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

/** @returns {Freelancer} a randomly generated name, occupation and rate */
function getFreelancer() {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
    const rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;

    return {name, occupation, rate};
}


//array of freelancer objects

const freelancers = Array.from({ length: NUM_FREELANCERS }, getFreelancer);

//Calculate the average rate of all freelancres in state

function averageRate (freelancers) {
    if (!freelancers.length) return 0;

    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.rate, 0);
    return total / freelancers.length;
}

//inialize a state variable which will store the average rate of all freelancers

const freelancerList = Array.from({ length: NUM_FREELANCERS }, getFreelancer);
const averageRates = calculateAverageRate(freelancers); 

function calculateAverageRate(freelancerList) {
 if (!freelancerList.length) return 0;
    
const totalRate = freelancerList.reduce((sum, freelancer) => sum + freelancer.rate, 0);
return totalRate / freelancerList.length;
}

//component function to represent a single function
/**
 * @param {Freelancer} freelancer
 * @returns {HTMLElement} a row representing the freelancer
 */
function FreelancerRow(freelancer) {
    const { name, occupation, rate } = freelancer;

    const $row = document.createElement("tr");
    $row.innerHTML = `
        <td>${name}</td>
        <td>${occupation}</td>
        <td>$${rate}</td>
    `;

    return $row;
}

//Create all table rows
/**
 * @param {Freelancer[]} freelancers
 * @returns {HTMLElement} a table representing the freelancer
 */

function Freelancers(freelancers) {
    const $tbody = document.createElement("tbody");
    const $freelancerRows = freelancers.map(FreelancerRow);
    $tbody.replaceChildren(...$freelancerRows);

    return $tbody;
}

//render the page

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
        <h2>
        Average Rate: $${averageRate(freelancers).toFixed(2)}
        </h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Occupation</th>
                    <th>Starting Rate</th>
                </tr>
            </thead>
            <!-- Placeholder tag to be replaced by the component -->
            <Freelancers></Freelancers>
        </table>
    `;
    const $table = $app.querySelector("table");

    $table.append(Freelancers(freelancers));
}

render();