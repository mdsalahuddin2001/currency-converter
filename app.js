/** @format */

const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const convertedResult = document.getElementById('converted-result');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caclulate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;

	fetch(
		`https://v6.exchangerate-api.com/v6/8b56722fb3b1342dd55e5d7d/latest/${currency_one}`,
	)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			const rate = data.conversion_rates[currency_two];
			rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
			let finalResult = (amountEl_one.value * rate).toFixed(2);
			amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
			convertedResult.innerHTML = finalResult;
		});
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
	const temp = currencyEl_one.value;
	console.log(currencyEl_two.value);
	currencyEl_one.value = currencyEl_two.value;
	currencyEl_two.value = temp;

	caclulate();
});

caclulate();
