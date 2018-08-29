 // API Firebase Start
 var config = {
    apiKey: "AIzaSyBSyZmWY93bQ3gYyOIG8FiGMg1Ssb3mkHY",
    authDomain: "tproject-72164.firebaseapp.com",
    databaseURL: "https://tproject-72164.firebaseio.com",
    projectId: "tproject-72164",
    storageBucket: "tproject-72164.appspot.com",
    messagingSenderId: "975307930970"
};
firebase.initializeApp(config);
 // API End here


//API Map here
var param = {
        lintang     : -6.976875 , //Bandung
        bujur       : 107.630042, //Bandung
        setLintang : function(data){
            this.lintang = parseFloat(data);
        },
        setBujur : function(data){
            this.bujur = parseFloat(data);
        },
        getLintang : function(){
            return this.lintang;
        },
        getBujur : function(){
            return this.bujur  ;
        }
    };
//API End here

//From to firebase
var activityList = document.getElementById('activityList');
var query = firebase.database().ref('activities').orderByKey();
var rowIndex = 1;

query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childData);
    });
});
//Form to DB
function createActivity(){
    var nama = document.getElementById('nama').value;
    var tanggal = document.getElementById('tanggal').value;
    var waktu = document.getElementById('waktu').value;
    var tujuan = document.getElementById('tujuan').value;
    var plat = document.getElementById('plat').value;
    var keberangkatan = document.getElementById('keberangkatan').value;
    var kedatangan = document.getElementById('kedatangan').value;

    var data = {
        nama: nama,
        waktu: tanggal + " " + waktu,
        tujuan: tujuan,
        plat: plat,
        keberangkatan: keberangkatan,
        kedatangan: kedatangan,
        notifikasi: "---"
    }

    var create = {};
    create['/activities/' + plat] = data;
    firebase.database().ref().update(create);
    reload_page();
    redraw(param.getLintang(), param.getBujur());
}
//End Here\

//Map API Start here
let map;

$(function() {
    map = new google.maps.Map(document.getElementById('peta'), {
        zoom: 17,
        center: {lat: param.getLintang(), lng : param.getBujur(), alt: 0}
    });

        //make marker
        map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map});
        map_marker.setMap(map);   
    });
function redraw(Lintang, Bujur) {
          map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
          map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

          pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

          var lineCoordinatesPath = new google.maps.Polyline({
            path: lineCoordinatesArray,
            geodesic: true,
            strokeColor: '#ffeb3b',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

          lineCoordinatesPath.setMap(map); 
      }

      function pushCoordToArray(latIn, lngIn) {
        lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
    }

    map = new google.maps.Map(document.getElementById('peta'), {
        zoom: 17,
        center: {lat: param.getLintang(), lng : param.getBujur(), alt: 0}
    });

        //make marker
        map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map});
        map_marker.setMap(map);  


//End Here\


function reload_page(){
    window.location.reload();
}

$(document).ready(function() {
    $('#activityList').DataTable();
});
//End here 