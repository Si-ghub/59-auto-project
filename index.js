const autoModelInput = document.getElementById('model');
const autoDateInput = document.getElementById('date');
const autoColorInput = document.getElementById('color');
const autoFuelInput = document.getElementById("fuel");
const addButton = document.getElementById('save');
const carsList = document.getElementById('list');
const addCarForm = document.getElementById('add_car');
const updateCarForm = document.getElementById('update_car');
const modelUpdateInput = document.getElementById("updateModel");
const dateUpdateInput = document.getElementById("updateDate");
const colorUpdateInput = document.getElementById("updateColor");
const fuelUpdateInput = document.getElementById("updateFuel");
let updateCar;
var FuelType;
(function (FuelType) {
    FuelType[FuelType["Dyzelis"] = 0] = "Dyzelis";
    FuelType[FuelType["Benzinas"] = 1] = "Benzinas";
})(FuelType || (FuelType = {}));
class Car {
    constructor(model, date, color, fuel) {
        this.model = model;
        this.date = new Date(date);
        this.color = color;
        this.fuel = +fuel;
        this.id = Math.round(Math.random() * 1000);
    }
    printCar(element) {
        element.innerHTML += `<div class="entry">
                <div class="entry_parameter">${this.model}</div>
                <div class="entry_parameter">${this.date.toISOString().slice(0, 10)}</div>
                <div class="entry_parameter">${this.color}</div>
                <div class="entry_parameter">${FuelType[this.fuel]}</div>
                <div class="actions">
                    <img class="update" onclick='onUpdateCar(${this.id})' src='./img/update.png' alt="Atnaujinti">
                    <img class="delete" onclick='onDeleteCar(${this.id})' src='./img/delete.png' alt="Istrinti">
                </div>
            </div>`;
    }
}
const autoPark = [];
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', (e) => {
    if (autoModelInput.value === '' ||
        autoDateInput.value === '' ||
        autoColorInput.value === '' ||
        autoFuelInput.value === '') {
        alert("Klaida, langelis negali buti tuscias...");
        return;
    }
    ;
    const car = new Car(autoModelInput.value, autoDateInput.value, autoColorInput.value, autoFuelInput.value);
    console.log('Mygtukas ..');
    autoPark.push(car);
    publishCars();
    autoModelInput.value = '';
    autoDateInput.value = '';
    autoColorInput.value = '';
    autoFuelInput.value = '';
});
function publishCars(filter) {
    carsList.innerHTML = '';
    for (const car of autoPark) {
        if (filter === undefined || filter === car.fuel) {
            car.printCar(carsList);
            console.log(car.model);
        }
    }
}
function onUpdateCar(id) {
    for (const car of autoPark) {
        if (id === car.id) {
            updateCar = car;
        }
    }
    console.log(updateCar);
    populateUpdateForm();
    addCarForm.classList.add("hide");
    updateCarForm.classList.remove("hide");
}
function populateUpdateForm() {
    modelUpdateInput.value = updateCar.model;
    dateUpdateInput.value = updateCar.date.toISOString().slice(0, 10);
    colorUpdateInput.value = updateCar.color;
    fuelUpdateInput.value = updateCar.fuel.toString();
}
function onSave() {
    updateCar.model = modelUpdateInput.value;
    updateCar.date = new Date(dateUpdateInput.value);
    updateCar.color = colorUpdateInput.value;
    updateCar.fuel = +fuelUpdateInput.value;
    addCarForm.classList.remove("hide");
    updateCarForm.classList.add("hide");
    publishCars();
}
function onDeleteCar(id) {
    let deleteCar;
    for (const car of autoPark) {
        if (id === car.id) {
            deleteCar = car;
        }
    }
    if (deleteCar) {
        autoPark.splice(autoPark.indexOf(deleteCar), 1);
    }
    publishCars();
}
function allCarsList() {
    publishCars();
}
function dyzelCarsList() {
    publishCars(FuelType.Dyzelis);
}
function gasCarsList() {
    publishCars(FuelType.Benzinas);
}
