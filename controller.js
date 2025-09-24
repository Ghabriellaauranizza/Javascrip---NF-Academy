// controller
import users from "./data.js";

// Fungsi menampilkan semua data
const index = () => {
    let output = '~~~ SEMUA DATA PENGGUNA ~~~\n\n';
    users.forEach((user, idx) => {
        output += `${idx + 1}. Nama: ${user.nama}\n`;
        output += `   Umur: ${user.umur} tahun\n`;
        output += `   Alamat: ${user.alamat}\n`;
        output += `   Email: ${user.email}\n`;
        output += '----------------------------\n'
    });
    return output;
};

// Fungsi menambah dsta baru (minimal 2 data dalam proses push)
const store = (newUsers) => {
    let output = '';
    if (Array.isArray(newUsers)) {
        users.push(...newUsers);
        output = `${newUsers.length} data pengguna berhasil ditambahkan!\n\n`;
        output += 'Data yang ditambahkan:\n';
        newUsers.forEach(user => {
            output += `- ${user.nama} (${user.email})\n`;
        });
    } else {
        users.push(newUsers);
        output = '1 data pengguna baru berhasil ditambahkan!\n\n';
        output += `Data yang ditambahkan:\n- ${newUsers.nama} (${newUsers.email})\n`;
    }
    return output;
};

// Fungsi untuk menghapus data
const destroy = (identifier) => {
    let deletedUser = null;

    if (typeof identifier === 'number') {
        if (identifier >= 0 && identifier < users.length) {
            deletedUser = users.splice(identifier, 1)[0];
        }
    } else if (typeof identifier === 'string') {
        const index = users.findIndex(user =>
            user.nama.toLowerCase() === identifier.toLowerCase() ||
            user.email.toLowerCase() === identifier.toLowerCase()
        );
        if (index !== -1) {
            deletedUser = users.splice(index, 1)[0];
        }
    }

    if (deletedUser) {
        return `Data pengguna berhasil dihapus:\n- Nama: ${deletedUser.nama}\n- Email: ${deletedUser.email}\n`;
    } else {
        return 'Data pengguna tidak ditemukan.';
    }
};

// Fungsi untukk menampilkan datta menggunakkan map()
const displayWithMap = () => {
    let output = '~~~ DATA PENGGUNA (MENGGUNAKAN MAP) ~~~\n\n';
    const userList = users.map((user, idx) => {
        return `${idx + 1}. ${user.nama} (${user.umur} tahun) - ${user.email}`;
    });

    userList.forEach(userInfo => {
        output += userInfo + '\n';
    });

    return output;
};

// Fungsi untukkk mendapatkan datta users (untukk keperluan UI)
const getUsers = () => {
    return users;
};


export { index, store, destroy, displayWithMap, getUsers };