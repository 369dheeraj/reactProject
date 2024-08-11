const student={
    age:5,
    name:"student",
    school:"nws"
}

console.log(JSON.stringify(student));

const jsonfmt= {"age":5,"name":"student","school":"nws"};

console.log(JSON.parse(JSON.stringify(jsonfmt)));