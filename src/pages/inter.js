let arr = [1,2,3,4,5,6,7,8,10]; 

function missingNumber(arr){
    let array = arr;
    let answer;
    let range = arr[1] - arr[0]
    let lstItemList = array[array.length - 1];
    for (let i = 1; i < lstItemList + 1; i+=range ){
        if (array.includes(i)){

        }else{
            answer = i;
            break;
        }
    }
    return answer;
}

console.log(missingNumber(arr));


let newArr = [1,2,3,1,4,5,6,7,7,8,10];

function returnDuplicateNumber(arr){
    let array = arr;
    let answer = []
    let checkArray = []
    for (let num of array){
     if(checkArray.includes(num)){
        answer.push(num)
     }else{
        checkArray.push(num)
     }
    }
    return answer;
}

console.log(returnDuplicateNumber(newArr));