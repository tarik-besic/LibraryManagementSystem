const rangeArray = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, number) => number + start)
}

export {
    rangeArray
}