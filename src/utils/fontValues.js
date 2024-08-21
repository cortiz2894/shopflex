const getRemValue = (ref) => {
    // Calculo el valor de 1em 
    const fontSize = window.getComputedStyle(ref).fontSize;
    const emValue = parseFloat(fontSize);
    return emValue
}


export {getRemValue}