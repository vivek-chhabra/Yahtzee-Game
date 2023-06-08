function randNum(max, min = 0) {
    let random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}

function randBool() {
    return randNum(1) == 1 ? true : false;
}

function displayFlex(boolean) {
    return boolean ? { display: "flex" } : { display: "none" };
}

export { randBool, randNum, displayFlex };
