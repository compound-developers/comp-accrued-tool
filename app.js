const address = document.getElementById('address');
const submit = document.getElementById('submit');
const output = document.getElementById('output');

submit.onclick = () => {
  if (address.value !== '') {
    const addr = address.value;
    fetch('https://api.compound.finance/api/v2/governance/comp/account?address=' + addr)
      .then(response => response.json())
      .then((data) => {
        try {
          let compAllocated = 0;
          let compDistributed = 0;
          data.markets.forEach(({ comp_allocated, comp_distributed }) => {
            compAllocated += +comp_allocated;
            compDistributed += +comp_distributed;
          });

          const compAccrued = compAllocated - compDistributed;
          output.innerText = compAccrued + ' COMP accrued';

        } catch (error) {
          console.error('data', data);
          console.error('error', error);
          output.innerText = 'Request error. Enter a valid address and try again.';
        }
      });
  }
};