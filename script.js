// ================================
// URL GOOGLE APPS SCRIPT WEB APP
// ================================

const API = "https://script.google.com/macros/s/AKfycbzDoyMuJjoIYO3KO3e1KEo8whcj7Hyv_-QZu18gtz4PAu6cR3ZxD-_exYVzcvJ2JetByw/exec";


let gpsReady = false;


// ================================
// AMBIL GPS OTOMATIS SAAT HALAMAN DIBUKA
// ================================

window.onload = function(){

    ambilGPS();

};



// ================================
// FUNGSI AMBIL GPS
// ================================

function ambilGPS(){


    if(!navigator.geolocation){

        document.getElementById("gpsStatus").innerHTML =
        "Browser tidak mendukung GPS";

        return;

    }


    document.getElementById("gpsStatus").innerHTML =
    "Mengambil lokasi...";


    navigator.geolocation.getCurrentPosition(

        function(position){


            let latitude =
            position.coords.latitude;


            let longitude =
            position.coords.longitude;


            let accuracy =
            position.coords.accuracy;



            document.getElementById("latitude").value =
            latitude;


            document.getElementById("longitude").value =
            longitude;



            gpsReady = true;



            document.getElementById("gpsStatus").innerHTML =
            "✅ Lokasi berhasil didapat ("+
            Math.round(accuracy)+
            " meter)";



            console.log(
                "GPS:",
                latitude,
                longitude,
                accuracy
            );


        },


        function(error){


            gpsReady = false;


            let pesan;


            switch(error.code){


                case error.PERMISSION_DENIED:
                    pesan =
                    "Izin lokasi ditolak";
                    break;


                case error.POSITION_UNAVAILABLE:
                    pesan =
                    "Lokasi tidak tersedia";
                    break;


                case error.TIMEOUT:
                    pesan =
                    "Waktu GPS habis";
                    break;


                default:
                    pesan =
                    "GPS gagal";


            }



            document.getElementById("gpsStatus").innerHTML =
            "❌ "+pesan;



            console.log(error);


        },


        {

            enableHighAccuracy:false,

            timeout:30000,

            maximumAge:60000

        }


    );


}




// ================================
// FUNGSI SIMPAN DATA
// ================================


function kirim(){



    // cek GPS

    if(!gpsReady){


        alert(
        "Lokasi belum tersedia. Tunggu GPS aktif."
        );


        return;


    }



    let tombol =
    document.getElementById("btnSimpan");



    // mode loading

    tombol.disabled = true;

    tombol.classList.add("loading");


    tombol.innerHTML =
    '<span class="spinner"></span> Menyimpan...';




    let data = {



        nama:
        document.getElementById("nama").value,



        hp:
        document.getElementById("hp").value,



        latitude:
        document.getElementById("latitude").value,



        longitude:
        document.getElementById("longitude").value,



        lokasi:
        document.getElementById("lokasi").value,



        keterangan:
        document.getElementById("ket").value



    };




    console.log(
        "Data dikirim:",
        data
    );




    fetch(API,{


        method:"POST",



        body:
        JSON.stringify(data),



        headers:{


            "Content-Type":
            "text/plain;charset=utf-8"


        }



    })



    .then(response=>response.json())



    .then(result=>{



        console.log(result);




        tombol.disabled=false;


        tombol.classList.remove("loading");


        tombol.innerHTML="Simpan";



        document.getElementById("hasil").innerHTML =
        "✅ Data berhasil disimpan";



        // reset form

        document.getElementById("formInput").reset();



        // ambil GPS ulang

        gpsReady=false;

        ambilGPS();



    })



    .catch(error=>{



        console.log(error);



        tombol.disabled=false;


        tombol.classList.remove("loading");


        tombol.innerHTML="Simpan";



        document.getElementById("hasil").innerHTML =
        "❌ Data gagal disimpan";



    });



}
