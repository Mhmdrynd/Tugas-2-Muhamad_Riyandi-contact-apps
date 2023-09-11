// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : 0
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Data \n");
    console.log("99.Exit \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData() 
            break;
        case 3:
            resetData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            hapusData()
            break;
        case 99:
            readline,close();
            break;
        // lanjutkan menu pilihanya disini secara urut
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    readline.question("Nama :", (nama) => {
        if(typeof nama !== "string" || !nama.trim()){
            console.log("Data tidak boleh kosong !");
            return simpan();
        }
        objectKontak.nama = nama;
        console.log(`Input data berhasil ! :${nama}`);
        ambilInputanNomor()
    })
    
}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        const nomorHp = parseFloat(nomor);
        if(isNaN(nomorHp) || nomorHp.toString() !== nomor || nomor.trim() === "") {
            console.log("Nomor Harus berupa angka !");
            return ambilInputanNomor();
        }
        objectKontak.nomorHp = nomor;
        if(databaseKontak.some((kontak) => kontak.nomorHp === objectKontak.nomorHp)){
            console.log(`Nomor HP ${objectKontak.nomorHp} sudah digunakan`);
            return ambilInputanNomor();
        }
        databaseKontak.push(Object.assign({},objectKontak)); // insert data kedalam array databseKOntak
        console.log(`kontak telah berhasil ditambahkan : ${objectKontak.nama}, dengan nomor HP${objectKontak.nomorHp}`)
        kembali()
    })
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if(pilihan === "y"){
            viewMenu()
        }else {
            readline.close()
        }
        
    })
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData () {
    databaseKontak.length = 0;
    console.log("Kontak telah direset");
    kembali();
    // tambahkan fungsi reset data disini
}

function pencarianData () {
    readline.question("Masukan Nama yang ingin anda cari:", (cariNama) =>{
        const result = databaseKontak.filter((kontak) => {
            kontak.nama.toLowerCase().includes(cariNama.toLowerCase())
        });
        if (result.length > 0 ) {
            console.table(result);
        }else {
            console.log("Nama Tidak Ditemukan");
        }
        kembali();
    });
    // tambahkan fungsi pencarian data disini 
}
function hapusData () {
    readline.question("Masukan nama kontak yang ingin anda hapus:", (index) => {
        if (index >= 0 && index < databaseKontak.length){
            const hapusKontak = databaseKontak.splice(index, 1)[0];
            console.log(`Kontak ${hapusKontak.nama} telah dihapus`);
        }else{
            console.log("Nama tidak valid.");
        }
        kembali();
    })
    // tambahkan fungsi hapus data data disini 
}


viewMenu() // panggil fungsi view menu untuk pertama kali