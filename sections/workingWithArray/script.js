// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // Array of bank movements

// // the power of chaining the methods

// const eurToUsd = 1.1;
// const totalDespoist = movements
//   .filter((mov) => mov < 0)
//   .map((mov, i, arr) => mov * eurToUsd)
//   .reduce((acc, mov, i, arr) => acc + mov, 0);
// console.log(`Total Despoist from movements is ${totalDespoist}`);

// const arr = [[3, [3, 5, 6], 2], [[3, 5], 7, 2, 1], 3, [34, 34]];
// console.log(arr.flat());
// console.log(arr.flatMap(1));

// implemention of flat function
// const flat = function (arr, depth = 1) {
//   let queue = [];

//   // first pack them in queue because all elements now is root
//   for (const ele of arr) queue.push(ele);
//   let level = 0;
//   while (level < depth) {
//     let sizeQ = queue.size();
//     while (sizeQ--) {}
//   }
// };
