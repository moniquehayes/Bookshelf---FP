///classes here -> for each input, create a new class. when that class is executed, the data will be added to an array.
const accounts = [];

const pagebody = document.querySelector(".register");

const createAccount = () => {
  const userObj = {};
  const user = document.querySelector(".newuser");
  userObj.username = user.value;
  const pass = document.querySelector(".newpassword");
  userObj.password = pass.value;

  const createdMessage = document.createElement("section");
  createdMessage.textContent =
    "Account created! Use your account to sign in.";
  pagebody.append(createdMessage);

  createAccountBtn.setAttribute("disabled", "true");

  accounts.push(userObj);

  console.log(accounts);
};

const createAccountBtn = document.querySelector(".create-account");
createAccountBtn.addEventListener("click", createAccount);

