const car= ['tata','kia','bmw'];

console.log(car.at(1));
console.log(car.at(-3));

const color = ['green','orange','yellow',3];
console.log(color[3])

//tostring() method

console.log(`toString methodreturn comma separated value ${car.toString()} `)

console.log(`without using toString method return comma separated value ${car} `)


//findIndex method

const count = [3,30,60,9,6]
console.log(count.findIndex(check))

function check(item){
return item > 20;
}