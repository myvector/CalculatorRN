export const replaceLastElementInArray = (array:string[], value:string, upDate?:boolean) => {
    const tmp = [...array];
    const lastElement = array.length - 1;
  
    tmp[lastElement] = upDate
      ? array[lastElement] + value
      : (array[lastElement] = value);
    return tmp;
  };