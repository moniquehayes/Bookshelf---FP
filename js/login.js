const accounts = {};

/// login //
const signInBody = document.querySelector('.signin');
signInBody.classList.add('sign-in');

const login = () => {
    // const userObj = {};
    const user = document.querySelector('.username');
    const userInput = user.value;

    const pass = document.querySelector('.password');
    const passInput = pass.value;
// console.log(accounts.indexOf(userObj) >=0);
    if (accounts[userInput]===passInput) { window.open('index.html')
    } else {
        const errorMessage = document.createElement('section');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = ('A login with that username and password does not exist.')
        signInBody.append(errorMessage)}
}

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', login, false);
//////////



///register ///
const registerBody = document.querySelector(".register");

const createAccount = () => {
  const newUser = document.querySelector(".newuser");
    const username = newUser.value;
  const newPass = document.querySelector(".newpassword");
  const password = newPass.value;
 accounts[username] = password;

  const createdMessage = document.createElement("section");
  createdMessage.classList.add('created-message');
  createdMessage.textContent =
    "Account created! Use your account to sign in.";
  registerBody.append(createdMessage);

  createAccountBtn.setAttribute("disabled", "true");
};

const createAccountBtn = document.querySelector(".create-account");
createAccountBtn.addEventListener("click", createAccount);