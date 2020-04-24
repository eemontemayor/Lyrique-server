
    
     function groupByLength(arr){

        let lrg = []
    let med = []
    let sm = []
  
    arr.forEach(i => {
         
        return i['numSyllables'] === 1 || i['numSyllables'] === 2  ? sm.push(i): i['numSyllables'] === 3 || i['numSyllables'] === 4 ? med.push(i) : lrg.push(i)
  
    

})

   
       
console.log('sm', sm)
console.log('med', med)
console.log('lrg', lrg)
    return [sm,med,lrg]



     }

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};
function partition(array, start, end) {
    const pivot = array[end - 1]['numSyllables'];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i]['numSyllables'] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};
function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

module.exports={groupByLength,quickSort}; 