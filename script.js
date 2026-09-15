alert("Javascript aktif");

const API =
"https://script.google.com/macros/s/AKfycbzDoyMuJjoIYO3KO3e1KEo8whcj7Hyv_-QZu18gtz4PAu6cR3ZxD-_exYVzcvJ2JetByw/exec";

window.onload = function(){

    ambilGPS();

};


function ambilGPS(){

    if(navigator.geolocation){


        navigator.geolocation.getCurrentPosition(

        function(position){


            let latitude =
            position.coords.latitude;


            let longitude =
            position.coords.longitude;


            document.getElementById("latitude").value =
            latitude;


            document.getElementById("longitude").value =
            longitude;


            document.getElementById("gpsStatus").innerHTML =
            "Lokasi berhasil didapat";


            console.log(
              "GPS:",
              latitude,
              longitude
            );


        },


        function(error){

    let pesan = "";

    switch(error.code){

        case error.PERMISSION_DENIED:
            pesan = "Izin lokasi ditolak";
            break;

        case error.POSITION_UNAVAILABLE:
            pesan = "Lokasi tidak tersedia";
            break;

        case error.TIMEOUT:
            pesan = "Waktu pengambilan GPS habis";
            break;

        default:
            pesan = "Error tidak diketahui";
    }


    document.getElementById("gpsStatus").innerHTML =
    pesan;

    console.log(error);

},


        {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:0
        }

        );


    }else{

        alert("GPS tidak didukung browser");

    }

}

function kirim(){

let data={

nama: document.getElementById("nama").value,

hp: document.getElementById("hp").value,

latitude: document.getElementById("latitude").value,

longitude: document.getElementById("longitude").value,

lokasi: document.getElementById("lokasi").value,

keterangan: document.getElementById("ket").value

};


console.log(data);


fetch(API,{

method:"POST",

body:JSON.stringify(data),

headers:{
"Content-Type":"text/plain;charset=utf-8"
}

})

.then(response=>response.json())

.then(result=>{

console.log(result);

document.getElementById("hasil").innerHTML =
"Data tersimpan";

})

.catch(error=>{

console.log(error);

document.getElementById("hasil").innerHTML =
"Gagal mengirim data";

});


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

function kirim(){


let lat =
document.getElementById("latitude").value;


let lon =
document.getElementById("longitude").value;


if(lat=="" || lon==""){

alert("Lokasi belum tersedia, tunggu GPS aktif");

return;

let accuracy =
position.coords.accuracy;

}


// lanjut kirim data


}
