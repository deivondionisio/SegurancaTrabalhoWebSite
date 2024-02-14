let loginForm = document.querySelector(".my-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    console.log('Email:', email.value);
    console.log('Password:', password.value);

    // Simulação de login bem-sucedido (substitua por sua própria lógica de login)
    const loginSuccessful = true;

    if (loginSuccessful) {
        // Redirecionar para a pagina_request_icon.html
        window.location.href = "../../pagina_request_icon.html";
    } else {
        // Se o login falhar, você pode exibir uma mensagem de erro ou fazer outra ação.
        alert("Login falhou. Verifique suas credenciais.");
    }
});