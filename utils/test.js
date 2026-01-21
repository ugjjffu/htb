// function deepClone(target) {
//     const map = new WeakMap();
//     function isObject(data) {
//         return (typeof data === 'object' && data) || (typeof data === 'function')
//     }
//     function clone(data) {
//         if (!isObject(data)) {
//             return data;
//         }
//         if (typeof data === 'function') {
//             return new Function('return ' + data);
//         }
//         const exist = map.get(data);
//         if (exist) {
//             return exist;
//         }
//         const keys = Reflect.ownKeys(data);
//         const allDesc = Object.getOwnPropertyDescriptor(data);
//         const result=Object.create(Object.getPrototypeOf(data),allDesc);
//         map.set(data,result);
//         keys.forEach(key=>{
//             const val=result[key];
//             if(isObject(val)){
//                 result[key]=clone(val);
//             }else{
//                 result[key]=val;
//             }
//         })
//         return result;
//     }
//     clone(target);
// }

// const a = {
//     b: "132",
//     c: 123,
// }
// const b = deepClone(a);
// console.log(a === b);