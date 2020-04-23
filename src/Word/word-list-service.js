
    
     function groupByLength(arr){

       
    const list = arr.sort((a,b)=> {
        return a['numSyllables'] - b['numSyllables']} );

    console.log(list)
    return list;


}


module.exports={groupByLength}; 