export function convertToPairs(input: string): number[][] {
    // Dividir a string em um array de strings, separadas por vírgula
    const strValues = input.split(',');
  
    // Verificar se o número de elementos é par
    if (strValues.length % 2 !== 0) {
      throw new Error('O número de elementos precisa ser par');
    }
  
    // Criar um array para armazenar os pares
    const pairs: number[][] = [];
  
    // Iterar pelos valores e formar os pares
    for (let i = 0; i < strValues.length; i += 2) {
      // Converter os dois valores para inteiros
      const num1 = parseInt(strValues[i]);
      const num2 = parseInt(strValues[i + 1]);
  
      // Adicionar o par ao array de pares
      pairs.push([num1, num2]);
    }
  
    return pairs;
  }  