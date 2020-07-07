const Separator = function(){
  return {
    
  }
}

const prompt = jest.fn(questions => Promise.resolve(questions))

const inquirer = {
  prompt,
  Separator,
}

module.exports = {
  inquirer
}