const validName = 'MAX';
const validClasse = 'swordsman';
const validLevel = 10;
const validPassword = 'SavingPeople';

const user = {
    username: validName,
    classe: validClasse,
    level: validLevel,
    password: validPassword
};

const noClasseUser = {
    username: validName,
    classe: undefined,
    level: 10,
    password: 'SavingPeople'
};

const noClasseString = {
    username: validName,
    classe: 1,
    level: 10,
    password: 'SavingPeople'
};

const noClasseCharacter = {
    username: validName,
    classe: 'Gt',
    level: 10,
    password: 'SavingPeople'
};

const noLevelUser = {
    username: validName,
    classe: validClasse,
    level: undefined,
    password: 'SavingPeople'
};

const noLevelNumber = {
    username: validName,
    classe: validClasse,
    level: 'Aquele la',
    password: 'SavingPeople'
};

const levelNumberZero = {
    username: validName,
    classe: validClasse,
    level: 0,
    password: 'SavingPeople'
};

const noPasswordUser = {
    username: validName,
    classe: validClasse,
    level: validLevel,
    password: undefined
};

const noPasswordString = {
    username: validName,
    classe: validClasse,
    level: validLevel,
    password: 12345
};

const noPasswordCharacter = {
    username: validName,
    classe: validClasse,
    level: validLevel,
    password: 'dois'
};

export default {
    user,
    noClasseUser,
    noClasseString,
    noClasseCharacter,
    noLevelUser,
    noLevelNumber,
    levelNumberZero,
    noPasswordUser,
    noPasswordString,
    noPasswordCharacter
};
