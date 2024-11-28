const correctPassword = "passwordesenha";
let attemptCount = 0;
let isLocked = false;
let lockTime = 60000;
let lockEndTime = null;
let timerInterval = null;

document.getElementById("submitButton").addEventListener("click", () => {
    if (isLocked) {
        return;
    }

    const input = document.getElementById("passwordInput").value;
    const message = document.getElementById("message");

    if (input === correctPassword) {
        message.style.color = "limegreen";
        message.textContent = "Senha correta! Redirecionando...";
        clearInterval(timerInterval);
        document.body.classList.remove("locked");
        setTimeout(() => {
            window.location.href = "https://example.com";
        }, 1000);
    } else {
        attemptCount++;
        message.style.color = "red";
        message.textContent = `Senha incorreta. Tentativa ${attemptCount} de 5.`;

        if (attemptCount >= 5) {
            startLock();
        }
    }

    document.getElementById("passwordInput").value = "";
});

function startLock() {
    isLocked = true;
    lockEndTime = Date.now() + lockTime;
    document.getElementById("message").textContent = `Muitas tentativas incorretas.`;
    document.body.classList.add("locked");
    timerInterval = setInterval(updateTimer, 1000);

    setTimeout(() => {
        isLocked = false;
        attemptCount = 0;
        document.body.classList.remove("locked");
        clearInterval(timerInterval);
        document.getElementById("countdownTimer").textContent = "";
        document.getElementById("message").textContent = "";
    }, lockTime);
}

function updateTimer() {
    const countdownTimer = document.getElementById("countdownTimer");
    const timeLeft = Math.max(0, lockEndTime - Date.now());

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        return;
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    countdownTimer.textContent = `Tempo restante: ${minutes}:${seconds.toString().padStart(2, "0")}`;
}
