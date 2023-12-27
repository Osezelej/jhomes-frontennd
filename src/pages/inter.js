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

let text = '<div xmlns=\"http://www.w3.org/1999/xhtml\">Your appointment has been reserved for 2023-06-29 10:00:00. Reference ID is a06876d5-d1e1-4d83-a0e9-6715a6e4cdcc. Appt Block Id is 0. Appt Encounter Id is 31101.</div>'
function AppIds(str){
    let stment = str;
    let answer = {
        referenceId:'',
        blockId:'',
        EncounterId:'',
    }

    // refrenceId 
    let strlist = stment.split(' ')
    let refrenceIdIndex =  strlist.findIndex((value)=>{
            return value == 'Reference'
            })

    answer.referenceId = strlist[refrenceIdIndex + 3]

    // refrenceId 
    let blockIdIndex =  strlist.findIndex((value)=>{
            return value == 'Block'
            })

    answer.blockId = strlist[blockIdIndex + 3]
    
   // refrenceId 
   let encounterIdIndex =  strlist.findIndex((value)=>{
    return value == 'Encounter'
    })

answer.EncounterId = strlist[encounterIdIndex + 3]
console.log()
return answer;


}

console.log(AppIds(text)); 