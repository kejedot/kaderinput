alert("Javascript aktif");

const API =
"https://script.google.com/macros/s/AKfycbzDoyMuJjoIYO3KO3e1KEo8whcj7Hyv_-QZu18gtz4PAu6cR3ZxD-_exYVzcvJ2JetByw/exec";


function kirim(){

    let data = {
        nama: document.getElementById("nama").value,
        hp: document.getElementById("hp").value,
        lokasi: document.getElementById("lokasi").value,
        keterangan: document.getElementById("ket").value
    };


    fetch(API, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"text/plain;charset=utf-8"
        }
    })
    .then(response => response.json())
    .then(result => {

        console.log(result);

        document.getElementById("hasil").innerHTML =
        "Data berhasil disimpan";

    })
    .catch(error=>{
        console.log(error);
        document.getElementById("hasil").innerHTML =
        "Terjadi error";
    });

}
