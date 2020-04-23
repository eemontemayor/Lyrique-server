
    
     function groupByLength(arr){

       
    const list = arr.sort((a,b)=> {
        return a['numSyllables'] - b['numSyllables']} );

    console.log(list)
    return list;


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