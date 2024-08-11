const {userService,ageService} = require('../javascript_practice/functionservice')

class Student{

    constructor(name,year){
        this.name=name;
        this.year=year;
    }

    print(para){
        console.log(userService(para));
    }

    age(){
        let date = new Date();
        console.log(ageService(date.getFullYear()-this.year));
    }


}

const std1 = new Student('dheeraj',1986);
std1.print(std1.name);
std1.age();

const std2 = new Student('dheeraj2',1987);
std2.print(std2.name);
std2.age();


const changed = JSON.stringify(std1);

console.log(changed);
console.log(JSON.parse(changed));