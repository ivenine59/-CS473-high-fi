import { loginEmail, signupEmail } from "../firebase.js";
const buttons = document.getElementById('buttons');

buttons.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id == "signin"){
        loginEmail(email.value, pw.value).then((result) => {
            console.log(result);
            const user = result.user;
            loginSuccess(user.email, user.uid);
        });
    } else if (e.target.id == "signup"){
        signupEmail(email.value, password.value).then((result) => {
            const user = result.user;
            loginSuccess(user.email, user.uid);
        })
        .catch((error) => console.log(error));
    }
});

const loginSuccess = (email, uid) => {
    const login_area = document.getElementById("login-area");
    login_area.innerHTML = "<h2>Login 성공!</h2><div>uid: ${uid}</div><div>email: ${email}</div>";
}