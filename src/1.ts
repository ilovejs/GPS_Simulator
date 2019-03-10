// const wait = (ms) => new Promise(res => setTimeout(res, ms));

// const startAsync = async callback => {
//   await wait(1000);
//   callback('Hello');
//   await wait(1000);
//   callback('And Welcome');
//   await wait(1000);
//   callback('To Async Await Using TypeScript');
// };

// startAsync(text => console.log(text));

// const one = new Promise<string>((resolve, reject) => {
//   resolve('Hello');
// });
// const two = one.then(value => {});


const one = 'One';
const two = new Promise(resolve => resolve('Two'));
const three = new Promise((resolve, reject) => reject(new Error('Three')));

async function gilad() {
  const four = await one;
  console.log({ one: four });

  const five = await two;
  console.log({ two: five });

  try {
    const six = await three;
    console.log('This will not get called at all');
  }
  catch(e) {
    console.log({ three: e.message});
  }
}
gilad();

// gilad().then(value => {
//   console.log(value);
// });

