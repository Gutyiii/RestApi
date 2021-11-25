$(function () {

    const sajtomb = [];
    const szuloelem = $(".megjelolt");
    const myAjax = new MyAjax();
    let apiVegpont = "http://localhost:3000/konyvek";
    //let szuro = "?tipus=horror";
    //apiVegpont += szuro;
    //console.log(apiVegpont);
    $("#rendezesArszerint").on("click", () => {
        let apiVegpont = "http://localhost:3000/konyvek";
        let rendezes = "?_sort=ar&order=desc"
        apiVegpont += rendezes;
        myAjax.adatbeolvas(apiVegpont, sajtomb, megjelenit);
    });
    myAjax.adatbeolvas(apiVegpont, sajtomb, megjelenit);
    lenyiloMenu();


    function lenyiloMenu() {
        const szuloElem2 = $("#szuloeleme");
        const sablon2 = $(".gyerekeleme");
        sajtomb.forEach((elem,index) => {
            const termek = sablon2.clone().appendTo(szuloElem2);
            myAjax.adatbeolvas(apiVegpont, sajtomb, megjelenit);
        });
        sablon2.remove();

        $(window).on("sorszam", (esemeny) => {
            let aktTermek = esemeny.detail;
        });
    };



    /*****************adatkiírás:*******************/

    $("#ujadatBesuras").on("click", () => {
        let ujAdat = {
            szerzo: $("#bekertSzerzo").val(),
            cim: $("#bekertCim").val(),
            ar: $("#bekertAr").val(),
            tipus: $("#bekertMufaj").val()
        };
        myAjax.adatkuldes(apiVegpont, ujAdat);
        console.log(ujAdat);
    });




    /********************Adat törlés:************ */

    $("#adattorles").on("click", () => {
        myAjax.adattorles(apiVegpont, /*$("#mezoszam").val()*/ aktTermek);
    });



    /********************Adat módósít:************ */

    $("#adatmodosit").on("click", () => {
        let ujAdat = {
            szerzo: $("#bekertSzerzo").val(),
            cim: $("#bekertCim").val(),
            ar: $("#bekertAr").val(),
            tipus: $("#bekertMufaj").val()
        };
        console.log(ujAdat);
        myAjax.adatmodosit(apiVegpont, ujAdat, $("#mezoszam").val());
    });






    $("#kmezo").on("keyup", () => {
        let apiVegpont = "http://localhost:3000/konyvek";
        let kereses = "?tipus=";
        let betu = $("input").val();
        apiVegpont += kereses + betu;
        console.log(apiVegpont);
        myAjax.adatbeolvas(apiVegpont, sajtomb, megjelenit);
    })

    function megjelenit(tomb) {
        //console.log(sajtomb);
        let sablon = "";
        tomb.forEach((elem) => {
            sablon += `
                <div >
                    <h3 >${elem.szerzo}</h3>
                    <h4 class="cim">${elem.cim}</h4>
                    <p>${elem.tipus}</p>
                    <span class="ar">${elem.ar}</span>
                </div>`;
            szuloelem.html(sablon);
        })
    }

});