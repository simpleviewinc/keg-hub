const typeOf = val => Object.prototype.toString.call(val).slice(8, -1);

export { typeOf as t };
