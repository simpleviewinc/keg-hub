const equalsNaN = val => typeof val === 'number' && val != val;

const isNum = val => typeof val === 'number' && !equalsNaN(val);

export { equalsNaN as e, isNum as i };
