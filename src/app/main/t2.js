import t1 from './t1';

console.log(t1,'====t2中的t1值');
let obj = {
    a: 't2',
}

setTimeout(()=>{
    obj.b = 't2';
    console.log('t2--',obj)
});

export default obj;