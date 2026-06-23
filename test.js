function getRandomInt(max) {
  // return Math.floor(Math.random() * max);
    let rand = Math.random()
  console.log("rand: ",rand)
  let res = rand // * max
  console.log("res: ",res)
  return res.toFixed(2);
}



console.log(getRandomInt(1));
