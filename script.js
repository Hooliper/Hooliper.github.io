const planes = [
    ["12 Hipotecario", 12, 6, 6],
    ["9 Naranja", 12, 9, 6],
    ["4 Naranja", 12, 4, 6],
    ["Ahora 12", 12, 12, 6]
    ]

function listaPlanes(idSelect, planElegido) {
    for (let i = 0; i < planes.length; i++){
        if (planElegido == i){
            $('#'+idSelect).append('<option value='+i+' selected>'+planes[i][0]+'</option>');
        } else {
            $('#'+idSelect).append('<option value='+i+'>'+planes[i][0]+'</option>');
        } 
    } 
}

listaPlanes("plan");

let numeroFila = 1;

function agregaFilaManual(){
    let cod = $('#codigo').val();
    let descripcion = $('#descripcion').val();
    let precio = $('#precio').val();
    let cr = $('#cr').val();
    let totalPrecioCr = $('#total').html();
    let planElegido = $('#plan').val();
    let cant = $('#cant').val();
    
    $('#codigo').val('');
    $('#descripcion').val('');
    $('#precio').val('');
    $('#cr').val('');
    $('#total').html(0);
    $('#cant').val(1);

    agregaFila(cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant);
}

function agregaFilaExcel(arrExcel){
    $("#divTabla").show(400);
    for (let i = 0; i < arrExcel.length; i++) {
        if (arrExcel[i]["Articulo"] !== "Total") {
            let cod = arrExcel[i]["Articulo"];
            let descripcion = arrExcel[i]["Desc. Articulo"];
            let precio = arrExcel[i]["Precio Vigente"].toFixed(2);
            let cr = 0;
            let totalPrecioCr = precio;
            let planElegido = 0;
            let cant = 1;
            agregaFila(cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant);
        }
    }
}

function agregaFila(cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant){
    let fila = '<tr id="'+numeroFila+'">'+
                '<td>'+numeroFila+'</td>'+
                '<td class="celdaAlineadaDerecha">'+cod+'</td>'+
                '<td class="celdaDesc">'+descripcion+'</td>'+
                '<td><input type="text" value="'+precio+'" class="celdaPrecio inputPrecio form-control" readonly tabindex="-1"></td>'+
                '<td><input type="text" value="'+cr+'" class="celdaCr inputPrecio form-control" oninput="sum(this)" maxlength="9" onkeypress="validaSoloNumero(event, value)"></input></td>'+
                '<td><input type="text" value="'+totalPrecioCr+'" class="celdaTotalPrecioCr inputPrecio form-control" readonly tabindex="-1"></td>'+
                '<td>'+
                    '<select id="planFila'+numeroFila+'" class="inputSelect form-control">'+
                        
                    '</select>'+
                '<td><input type="number" min="0" max="8" class="inputCant form-control" value="'+cant+'" onkeypress="soloNumeroCant(event, value)" oninput="limitMax(this)"></td>'+  
                '</td>'+
                '<td><b><a href="#" class="borrar" onclick="eliminaFila(this)">X</a></b><td/>'+
            '</tr>';

    $('#tabla tbody').append(fila); 
    listaPlanes("planFila"+numeroFila, planElegido)
    numeroFila += 1;     
}

$('.enterNuevaFila').on('keypress',function(e) {
    if(e.which == 13) {
        let codigo = $('#codigo').val();
        if (localStorage[codigo]){
            if ($('#precio').val() > 0) {
                let articulo = JSON.parse(localStorage[codigo]);
                $('#descripcion').val(articulo["desc"]);
                $("#divTabla").show(400);
                agregaFilaManual(); 
            }
            else{
                errorDePrecio();
            }
        }
        else{
            errorDeCodigo();
        }
    }
});

//busca descripcion al salir del input cod
$('#codigo').on('focusout', function(){
    let codigo = $('#codigo').val();
    if (codigo.length > 0){
        if (localStorage[codigo]){
            let articulo = JSON.parse(localStorage[codigo]);
            $('#descripcion').val(articulo["desc"]);
        }
        else{
            errorDeCodigo();
        }
    }
});

function errorDeCodigo(){
    let err = '<label class="codError">Código erroneo <br>o inexistente</label>';
    $('#codLabel').append(err);
    setTimeout(() => {
        $(".codError").fadeOut(500);
      }, 2500);
}

function errorDePrecio(){
    let err = '<label class="codError">Debe ingresar el<br>precio del artículo</label>';
    $('#precioLabel').append(err);
    setTimeout(() => {
        $(".codError").fadeOut(500);
      }, 2500);
}

//validacion solo numeros: Codigo
document.querySelector(".soloNumero").addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});

//validacion solo numeros con decimales: Precios y CR 
function validaSoloNumero(evt, val){
    let a = val;
    let punto = a.indexOf(".");
        if (a.length < 1 || punto > -1){
            if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
            {
                evt.preventDefault();
            }
        } else {
        if (evt.which != 8 && evt.which != 0 && evt.which != 46 && evt.which < 48 || evt.which > 57)
            {
                evt.preventDefault();
            }
        }
}

function soloNumeroCant(evt, val){
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
        {
            evt.preventDefault();
        }
}

//limita maxima cantidad de etiquetas a 8
function limitMax(a){
    let idFila = $(a).parents('tr').attr('id');
    let val = Number($('#'+idFila+' .inputCant').val());
    if (val > 8) {
        $('#'+idFila+' .inputCant').val(8);
    }
}

function eliminaFila(a) {
    let idFila = $(a).parents('tr').attr('id');
    $('#'+idFila).remove();
}

//suma precio + cr en columna de carga
$('#precio').on('input', (sumaPrecioCr));
$('#cr').on('input', (sumaPrecioCr));
function sumaPrecioCr(){
    let a = Number($('#precio').val());
    let b = Number($('#cr').val());
    $('#total').html((a+b).toFixed(2));
}

//suma precio + cr en lista cargada
function sum(a){
    let idFila = $(a).parents('tr').attr('id');
    let celdaPrecio = Number($('#'+idFila+' .celdaPrecio').val());
    let celdaCr = Number($('#'+idFila+' .celdaCr').val());
    $('#'+idFila+' .celdaTotalPrecioCr').val((celdaPrecio+celdaCr).toFixed(2));
}

//Oculta la lista de articulos cargados
$("#divTabla").hide();

function imprimir(){
    window.open("etiqueta.html","miventana","width=600,height=600,menubar=no")
}


//LECTOR DE EXCEL

function handleFiles(files){
    let file = files[0];

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const zzexcel = window.XLSX.read(data, {
        type: 'binary'
      });
      const result = [];
      for (let i = 0; i < zzexcel.SheetNames.length; i++) {
        if (zzexcel.SheetNames[i] == "1502"){
            const newData = window.XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
            result.push(...newData)
        }
      }
      agregaFilaExcel(result);
      //console.log(result);
      //console.log(zzexcel.SheetNames);
      //console.log(result[5]["Desc. Articulo"]);
    }
};

function actualizaBd(files){
    let file = files[0];

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const zzexcel = window.XLSX.read(data, {
        type: 'binary'
      });
      const res = [];
      for (let i = 0; i < zzexcel.SheetNames.length; i++) {
        if (zzexcel.SheetNames[i] == "BD"){
            const newData = window.XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
            res.push(...newData)
        }
      }

      //Agrega los productos del excel a localStorage usando codigo como key
      for (let i = 0; i < res.length; i++){
        let articulo = JSON.stringify(res[i]);
        localStorage[res[i]["cod"]] = articulo;
      }
      alert("base de datos actualizada");
    }
};
//FIN LECTOR EXCEL

//Local Storage
//localStorage["bar"] = "LG TV";
//console.log(localStorage["bar"]);
 /*
localStorage.setItem('videoDetails', JSON.stringify(videoDetails) );
var videoDetails = JSON.parse(localStorage.getItem('videoDetails');
*/
