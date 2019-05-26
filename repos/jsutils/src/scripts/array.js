const randomArray = (arr, amount) => {
  amount = amount || 1
  const randoms = []
  for (let i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return amount === 1 ? randoms[0] : randoms
}

const randomizeArray = arr => {
  return arr.sort(() => {
    return 0.5 - Math.random()
  })
}

const uniqArr = (arr, key) => {
  return !key
    ? [ ...new Set(arr) ]
    : arr.reduce(
      (acc, cur) => [ ...acc.filter(obj => obj[key] !== cur[key]), cur ],
      []
    )
}

export {
  randomArray,
  randomizeArray,
  uniqArr
}