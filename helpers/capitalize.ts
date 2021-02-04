const capitalize = (char:string, firstLetter:boolean = true) => {
  if (typeof char !== 'string') return '';

  if(firstLetter){
    return char.charAt(0).toUpperCase() + char.slice(1)
  }

  return char.toUpperCase();
}

export default capitalize;