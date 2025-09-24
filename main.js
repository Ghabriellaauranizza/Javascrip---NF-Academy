// main.js
import { index, store, destroy, displayWithMap, getUsers } from './controller.js';

// UI Function
function addToOutput(text) {
    const output = document.getElementById('output');
    output.textContent += '\n' + text;
    output.scrollTop = output.scrollHeight;
}

function updateUserDisplay() {
    const display = document.getElementById('userDisplay');
    const users = getUsers();
    display.innerHTML = '<h3>Data Pengguna ('+ users.length +')</h3>';
    users.forEach((user, index) => {
        display.innerHTML += `<div class="user-item">${index}. ${user.nama} - ${user.email}</div>`;
    });
}

// Global function untuk HTML onclick
window.showAllUsers = () => {
    const result = index();
    addToOutput(result);
    updateUserDisplay();
};

window.showWithMap = () => {
    const result = displayWithMap();
    addToOutput(result);
    updateUserDisplay();
};

window.addSampleData = () => {
    const newUser = [
        {nama: 'Dyah Inkud', umur: 21, alamat: 'Mojokerto', email: 'dyahinkud@gmail.com'},
        {nama: 'Feomita Ramadhany', umur: 20, alamat: 'Jombang', email: 'feomita@gmail.com'}
    ];
    const result = store(newUser);
    addToOutput(result);
    updateUserDisplay();
};

window.addUser = () => {
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const alamat = document.getElementById('alamat').value;
    const email = document.getElementById('email').value;

    if (!nama || !umur || !alamat || !email) {
        addToOutput('Semua field harus diisi.');
        return;
    }

    const newUser = { nama, umur, alamat, email };
    const result = store(newUser);
    addToOutput(result);
    updateUserDisplay();

    // Clear form
    document.getElementById('nama').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('alamat').value = '';
    document.getElementById('email').value = '';
};

window.deleteUser = () => {
    const identifier = document.getElementById('deleteInput').value;

    if (!identifier) {
        addToOutput('Masukkan nama, email, atau index!');
        return;
    }

    const numIdentifier = parseInt(identifier);
    const finalIdentifier = isNaN(numIdentifier) ? identifier : numIdentifier;

    const result = destroy(finalIdentifier);
    addToOutput(result);
    updateUserDisplay();

    document.getElementById('deleteInput').value = '';
};

window.clearOutput = () => {
    document.getElementById('output').textContent = 'Output cleared.';
};

// Initialize saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateUserDisplay();
});