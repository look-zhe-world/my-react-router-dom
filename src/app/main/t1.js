let obj = {
    a: 't1',
}

setTimeout(()=>{
    // obj.b = 't1';
    obj = {
        b:'t1',
    }
    console.log('t1--',obj)
},1000);

export default obj;