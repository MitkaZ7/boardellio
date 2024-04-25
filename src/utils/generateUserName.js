import namesData from '../data/names.json';

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

export const generateRandomName = () => {
    const firstNames = namesData.firstNames;
    const lastNames = namesData.lastNames;

    const randomFirstNameIndex = getRandomIndex(firstNames);
    const randomLastNameIndex = getRandomIndex(lastNames);

    return `${lastNames[randomLastNameIndex]} ${firstNames[randomFirstNameIndex]}`;
};

