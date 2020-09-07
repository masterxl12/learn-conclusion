// import sum from './sum';
import multi from './multi';

// console.log(sum(1, 2));
import('./sum')
    .then(({default: sum}) => {
        console.log(sum(1, 2));
    }).catch(reason => {
    console.log(reason);
});

console.log(multi(2, 3));
