// HTMLInputElement nurodo kokio tipo elementa grazinam, gali buti null arba HTML element
const autoModelInput = document.getElementById('model') as HTMLInputElement;
const autoDateInput = document.getElementById('date') as HTMLInputElement;
const autoColorInput = document.getElementById('color') as HTMLInputElement;
const autoFuelInput = document.getElementById("fuel") as HTMLSelectElement;
const addButton = document.getElementById('save');
const carsList = document.getElementById('list') as HTMLInputElement;

const addCarForm = document.getElementById('add_car') as HTMLElement;
const updateCarForm = document.getElementById('update_car') as HTMLElement;

const modelUpdateInput = document.getElementById("updateModel") as HTMLInputElement;
const dateUpdateInput = document.getElementById("updateDate") as HTMLInputElement;
const colorUpdateInput = document.getElementById("updateColor") as HTMLInputElement;
const fuelUpdateInput = document.getElementById("updateFuel") as HTMLInputElement;


let updateCar: Car; // atnaujinamo automobilio objektas

enum FuelType {
    Dyzelis,
    Benzinas
}

class Car {
    public model: string;
    public date: Date;
    public color: string;
    public fuel: FuelType;
    public id: number;

    constructor(
        model: string,
        date: string,
        color: string,
        fuel: string) {

        this.model = model;
        this.date = new Date(date);
        this.color = color;
        this.fuel = +fuel;
        this.id = Math.round(Math.random() * 1000);
    }

    public printCar(element: HTMLElement) {
        // element.innerHTML += `${this.model}`
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

// kokio tipo duomenis saugosim 
const autoPark: Car[] = [];

// ? optional chaining jei reiksme null arba undefined nepridesime event listener
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
addButton?.addEventListener('click', (e) => {
    if (autoModelInput.value === '' ||
        autoDateInput.value === '' ||
        autoColorInput.value === '' ||
        autoFuelInput.value === '') {
        alert("Klaida, langelis negali buti tuscias...")
        return
    };

    const car = new Car(
        autoModelInput.value,
        autoDateInput.value,
        autoColorInput.value,
        autoFuelInput.value);

    console.log('Mygtukas ..');
    autoPark.push(car);

    publishCars();

    autoModelInput.value = '';
    autoDateInput.value = '';
    autoColorInput.value = '';
    autoFuelInput.value = '';
});

function publishCars(filter?: FuelType) {
    carsList.innerHTML = '';
    for (const car of autoPark) {
        if (filter === undefined || filter === car.fuel) {
            car.printCar(carsList);
            console.log(car.model);
        }
    }
}

function onUpdateCar(id: number): void {
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

function onDeleteCar(id: number) {
    let deleteCar: Car | undefined; //= autoParkas[0];
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