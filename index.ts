// HTMLInputElement nurodo kokio tipo elementa grazinam, gali buti null arba HTML imout
const autoModelInput = document.getElementById('model') as HTMLInputElement;
const autoDateInput = document.getElementById('date') as HTMLInputElement;
const autoColorInput = document.getElementById('color') as HTMLInputElement;
const autoFuelInput = document.getElementById('fuel') as HTMLSelectElement;

const addToListButton = document.getElementById('button');

enum FuelType {
    Diesel = 0,
    Gasoline = 1
}

class Car {
    public readonly model: string;
    public readonly date: Date;
    public readonly color: string;
    public readonly fuel: FuelType;

    constructor(
        model: string,
        date: string,
        color: string,
        fuel: string) {

        this.model = model;
        this.date = new Date(date);
        this.color = color;
        this.fuel = +fuel;
    }
}

// kokio tipo duomenis saugosim 
let cars: Car[] = [];

// ? optional chaining jei reiksme null arba undefined nepridesime event listener
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
addToListButton?.addEventListener('click', () => {
    const car = new Car(
        autoModelInput.value,
        autoDateInput.value,
        autoColorInput.value,
        autoFuelInput.value)

    console.log('Mygtukas ..');

});