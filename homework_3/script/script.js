function isStrongPassword(password) {
    let hasNumber = false;
    let hasUpperCase = false;

    if (password.length < 8) {
        return password + " is too short!";
    }

    if (password.includes("password") || password.includes("1234")) {
        return password + " is too simple; includes 'password' or '1234'";
    }

    for (let currentNumber = 0; currentNumber < 10; currentNumber++) {
        if (password.includes(currentNumber.toString())) {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
        return password + " has no numbers!";
    }

    return password + " looks good!";
}

function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const result = isStrongPassword(password);
    document.getElementById("result").textContent = result;
}

