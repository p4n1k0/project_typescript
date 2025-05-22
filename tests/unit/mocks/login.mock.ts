const validPassword = 'SavingPeople';
const noUsernameLoginBody = { username: undefined, password: validPassword };

const validUsername = 'MAX';
const noPasswordLoginBody = { username: validUsername, password: undefined };

const validLogin = { username: validUsername, password: validPassword };

export default {
    noUsernameLoginBody,
    noPasswordLoginBody,
    validLogin,
};
