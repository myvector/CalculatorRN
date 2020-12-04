export const percentFormula = (percent:number, simbol:string, number:number) => {
    if (simbol == '+' || simbol == '-') {
      return new Function(`return ${number} * ${numberOfPercent(percent)}`)();
    } else if (simbol == '*' || simbol == '/') {
      return numberOfPercent(percent);
    }
  };
  
  const numberOfPercent = (percent:number) => percent / 100;