const validAmount = '30 peças de ouro';
const validName = 'Espada longa';

const noProductName = { name: undefined, amount: validAmount };
const validProduct = { name: validName, amount: validAmount };
const noProductAmount = { name: validName, amount: undefined };

export default {
    noProductName,
    validProduct,
    noProductAmount
};
