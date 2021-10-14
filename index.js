const autoModelInput = document.getElementById('model');
const autoDateInput = document.getElementById('date');
const autoColorInput = document.getElementById('color');
const autoFuelInput = document.getElementById('fuel');
const addToListButton = document.getElementById('button');
var FuelType;
(function (FuelType) {
    FuelType[FuelType["Diesel"] = 0] = "Diesel";
    FuelType[FuelType["Gasoline"] = 1] = "Gasoline";
})(FuelType || (FuelType = {}));
class Car {
    constructor(model, date, color, fuel) {
        this.model = model;
        this.date = new Date(date);
        this.color = color;
        this.fuel = +fuel;
    }
}
let cars = [];
addToListButton === null || addToListButton === void 0 ? void 0 : addToListButton.addEventListener('click', () => {
    const car = new Car(autoModelInput.value, autoDateInput.value, autoColorInput.value, autoFuelInput.value);
    console.log('Mygtukas ..');
});
