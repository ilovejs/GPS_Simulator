import {getHero} from './hero';
import {external} from './external';

async function gilad() {
    const handles = [
      'superman',
      'batman',
      'flash'
    ];

    for (const handle of handles) {
        //await on promise
        const item = await getHero(handle);
        console.log(`
      Name: ${item.name}
      Alias: ${item.alias}
        `);
      }
}

//generator function for local
function* numbers():IterableIterator<number> {
  let index = 1;
  while(true) {
    yield index;
    index = index + 1;
    if (index > 10) {
      break;
    }
  }
}

function gilad_2() {
  for (const num of numbers()) {
    console.log(num);
  }
}
gilad_2();



// for external
// async function* numbers_e() {
//     let index = 1;
//     while (true) {
//       yield index;
//       index = await external(index);
//       if (index > 10) {
//         break;
//       }
//     }
//   }

// async function gilad_e() {
//     for await (const num of numbers_e()) {
//         console.log(num);
//     }
// }
// gilad_e();
