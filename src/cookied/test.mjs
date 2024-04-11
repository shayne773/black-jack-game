import express from 'express';

const joinHalves = (firstArray, secondArray)=>{
    const l1 = firstArray.length%2==0?firstArray.length:firstArray.length-1;
    const l2 = secondArray.length%2==0?secondArray.length:secondArray.length-1;
    let resultArr = [];
    for(let i=0; i<l1/2; i++)
    {
        resultArr.push(firstArray[i]);
    }
    for(let i=0; i<l2/2; i++)
    {
        resultArr.push(secondArray[i]);
    }

    return resultArr;
}

const firstArray = [1,2,3,4,5,6]
   
const secondArray = ['a','a',];

console.log(joinHalves(firstArray, secondArray));

const myMap = (arr, myFunc)=>{
    return arr.map(myFunc);
}

const arr = [1,2,3];
const myFunc = (x)=>{
    return x*2;
}

const arr2 = arr.map((x)=>x*2)
console.log(myMap(arr, myFunc))
console.log(arr2);
console.log(Object.getPrototypeOf(arr2) == Array.prototype)

export const repeatCall = (fn, n, ...args) => {
    for(let i=0; i<n; i++)
    {
        fn(...args);
    }
}

function render(){
    console.log(this.name, '\n-----');
    if(this.listPrefix === '')
    {
        this.items.forEach(function(listItem, i){
            console.log(`${i+1}. ${listItem}`);
        })
        
    }
    else{
        this.items.forEach(function(listItem){
            console.log(`${i+1}. ${listItem}`);
        })
    }

}