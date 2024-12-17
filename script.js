const listaImprimir = [];
const listaAmarilla = [];
const lista0 = [];
const planes = [];

function planesBD() {
    if (localStorage["cantPlanes"]) {
        for (let i = 0; i < localStorage["cantPlanes"]; i++) {
            let p = JSON.parse(localStorage[i]);
            planes.push([p.nombre])
        }
    }
}
planesBD();

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
let numeroFilaStock0 = 1;
let numeroFilaAmarilla = 1;

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

    listaImprimir.push([numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant]);
    numeroFila++
    $('#tabla tbody').empty();
    tabImprimir(listaImprimir)
}

function agregaFilaExcel(arrExcel){
    $(".tabAmarilla").show();
    $(".tab0").show();
    $("#divTabla").show(400);
    for (let i = 0; i < arrExcel.length; i++) {
        if (arrExcel[i]["Sector"] == "INFORMATICA" ||
            arrExcel[i]["Sector"] == "G.E.D" ||
            arrExcel[i]["Sector"] == "TELEFONIA" ||
            arrExcel[i]["Sector"] == "IMAGEN Y SONIDO" ||
            arrExcel[i]["Sector"] == "P.E.D." ||
            arrExcel[i]["Sector"] == "TEMPORADA"
            ) {
            if (arrExcel[i]["Articulo"] !== "Total") {
                let cod = arrExcel[i]["Articulo"];
                let descripcion = arrExcel[i]["Desc. Articulo"];
                let precio = Number(arrExcel[i]["Precio Vigente"].toFixed(2));
            
                let artDB 
                if (localStorage[cod]) {
                    artDB = JSON.parse(localStorage[cod])
                    if (artDB.cr == 'amarillo'){
                        listaAmarilla.push([numeroFilaAmarilla, cod, descripcion, precio, 0, 0, 0, 1]);
                        numeroFilaAmarilla++
                        continue
                    }
                } else{
                    artDB = {
                        'planCuotas': planes[0][0],
                        'cr': 0,
                    }
                }
                
                let cr = Number(artDB.cr);
                let totalPrecioCr = (precio+cr).toFixed(2);
                let planElegido = planes.map(x => x[0]).indexOf(artDB.planCuotas);
                let cant = 1;
                if (arrExcel[i]["Stock"] !== 0) {
                    listaImprimir.push([numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant]);
                    numeroFila++
                } else{
                    lista0.push([numeroFilaStock0, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant]);
                    numeroFilaStock0++
                }
            }
        }
    }
    $('#tabla tbody').empty();
    tabImprimir(listaImprimir)
}

function tabImprimir (listaImprimir) {
    $('#tabla tbody').empty();
    for (let x of listaImprimir) {
        //agregaFila(numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant);
        agregaFila(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7])
      }
}

$('.tabImprimir a').on('click', function(e) {
    $('#x').show();
    $('#divTabla a.active').removeClass('active');
    $('.tabImprimir a').addClass('active');
    tabImprimir(listaImprimir)
});

function tabImprimirSinX (lista) {
    $('#tabla tbody').empty();
    for (let x of lista) {
        //agregaFila(numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant);
        agregaFilaSinX(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7])
      }
}

$('.tabAmarilla a').on('click', function(e) {
    $('#x').hide();
    $('#divTabla a.active').removeClass('active');
    $('.tabAmarilla a').addClass('active');
    tabImprimirSinX(listaAmarilla)
});

$('.tab0 a').on('click', function(e) {
    $('#x').hide();
    $('#divTabla a.active').removeClass('active');
    $('.tab0 a').addClass('active');
    tabImprimirSinX(lista0)
});


function agregaFila(numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant){

    let botonEdtit = "pencil-square";

    if (!localStorage[cod]) {
        botonEdtit = "pencil-square-red";
    }

    let fila = '<tr id="'+numeroFila+'">'+
                '<td>'+numeroFila+'<button type="button" class="botonEdit" data-toggle="modal" data-target="#abmArticulo" onclick="editarArticulo(this)"><img src="iconos/'+botonEdtit+'.svg" alt="edit" width="15" height="15"></button></td>'+
                '<td class="celdaCodigo celdaAlineadaDerecha">'+cod+'</td>'+
                '<td class="celdaDesc">'+descripcion+'</td>'+
                '<td><input type="text" value="'+precio+'" class="celdaPrecio inputPrecio form-control" oninput="sum(this)" tabindex="-1"></td>'+
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
}

function agregaFilaSinX(numeroFila, cod, descripcion, precio, cr, totalPrecioCr, planElegido, cant){
    let fila = '<tr id="'+numeroFila+'">'+
                '<td>'+numeroFila+'</td>'+
                '<td class="celdaCodigo celdaAlineadaDerecha">'+cod+'</td>'+
                '<td class="celdaDesc">'+descripcion+'</td>'+
                '<td><input type="text" value="'+precio+'" class="celdaPrecio inputPrecio form-control" oninput="sum(this)" tabindex="-1"></td>'+
                '<td><input type="text" value="'+cr+'" class="celdaCr inputPrecio form-control" oninput="sum(this)" maxlength="9" onkeypress="validaSoloNumero(event, value)"></input></td>'+
                '<td><input type="text" value="'+totalPrecioCr+'" class="celdaTotalPrecioCr inputPrecio form-control" readonly tabindex="-1"></td>'+
                '<td>'+
                    '<select id="planFila'+numeroFila+'" class="inputSelect form-control">'+
                        
                    '</select>'+
                '<td><input type="number" min="0" max="8" class="inputCant form-control" value="'+cant+'" onkeypress="soloNumeroCant(event, value)" oninput="limitMax(this)"></td>'+  
                '</td>'+
                
            '</tr>';

    $('#tabla tbody').append(fila); 
    listaPlanes("planFila"+numeroFila, planElegido)   
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
                $('#codigo').focus();
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
            let planElegido = planes.map(x => x[0]).indexOf(articulo.planCuotas);
            listaPlanes("plan", planElegido);
            $('#cr').val(articulo["cr"]);
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

//limita maxima cantidad de etiquetas a 8 en listado de carga
function limitMax(a){
    let idFila = $(a).parents('tr').attr('id');
    let val = Number($('#'+idFila+' .inputCant').val());
    if (val > 8) {
        $('#'+idFila+' .inputCant').val(8);
    }
}

//limita maxima cantidad de etiquetas a 8 en carga manual
function limitMaxCant(a){
    let id = $(a).attr('id');
    let val = Number($('#'+id).val());
    if (val > 8) {
        $('#'+id).val(8);
    }
}

function eliminaFila(a) {
    let idFila = $(a).parents('tr').attr('id');
    $('#'+idFila).remove();
    for (const [index, value] of listaImprimir.entries()){
        if(value[0] == idFila){
            listaImprimir.splice(index, 1)
        }
    }
    $('#tabla tbody').empty();
    tabImprimir(listaImprimir)
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
//$("#divTabla").hide();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function imprimir(){
    const listaCodigos = [];
    for (let i = 1; i < numeroFila; i++) {
        let cod = $('#'+i+' .celdaCodigo').html();
        let precio = $('#'+i+' .celdaPrecio').val();
        let cr = $('#'+i+' .celdaCr').val();
        let total = $('#'+i+' .celdaTotalPrecioCr').val();
        let plan = $('#'+i+' .inputSelect').val();
        let cant = $('#'+i+' .inputCant').val();
        let desc = $('#'+i+' .celdaDesc').html();
        listaCodigos.push({
            "cod": cod,
            "precio": precio,
            "cr": cr,
            "total": total,
            "plan": plan,
            "cant": cant,
            "desc": desc
        })
        let articulo = JSON.stringify(listaCodigos[i-1]);
        sessionStorage[i] = articulo;
    }
    sessionStorage["numeroFilas"] = numeroFila;
    window.open("etiqueta.html","Impresion","width=1200,height=1200,menubar=no")
}


//LECTOR DE EXCEL

function handleFiles(files){
    let file = files[0];
    let b = 0; //bandera que controla si el archivo tiene una hoja con el nombre 1502
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
            b = 1;
        }
      }
      if (b == 1) {
          agregaFilaExcel(result);
      }
      else{
        alert("Archivo de Cambio de precios incorrecto.")
      }
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
        const planes = [];

        if (zzexcel.SheetNames[0] == "BD"){
            const newData = window.XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]]);
            res.push(...newData)
        
            //Agrega los productos del excel a localStorage usando codigo como key
            for (let i = 0; i < res.length; i++){
                let articulo = JSON.stringify(res[i]);
                localStorage[res[i]["cod"]] = articulo;
            }

            //planes de cuotas
            const data = window.XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[1]]);
            planes.push(...data)

            for (let i = 0; i < planes.length; i++){
                let plan = JSON.stringify(planes[i]);
                localStorage[planes[i]["cod"]] = plan;
            }

            localStorage["cantPlanes"] = planes.length;
            planesBD()

            alert("Base de datos actualizada");
        } else{
            alert("Archivo de base de datos incorrecto");
        }
      

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

function editarArticulo(button) {
  // Limpiar los estilos de error anteriores
  $('#modalCod, #modalProducto, #modalMarca, #detalle1, #modalDesc, #modalEAN').removeClass('input-error');
  $('#error-message').hide(); // Ocultar el mensaje de error anterior

    // Obtener el código de la celda en la misma fila que el botón
  var codigo = $(button).closest('tr').find('.celdaCodigo').text();
  var descripcion = $(button).closest('tr').find('.celdaDesc').text();
  
  // Recuperar los datos del artículo desde localStorage
  if (localStorage[codigo]) {
      var articulo = JSON.parse(localStorage[codigo]); // Suponiendo que el código es único y se utiliza para acceder al artículo en localStorage
  }

    //Vaciar modal
    $('#modalCod').val(codigo);            // Código
    $('#modalDesc').val(descripcion);          // Descripción
    $('#modalProducto').val('');  // Producto
    $('#modalMarca').val('');        // Marca
    $('#detalle1').val('');       // Detalle 1
    $('#detalle2').val('');       // Detalle 2
    $('#detalle3').val('');       // Detalle 3
    $('#detalle4').val('');       // Detalle 4
    $('#detalle5').val('');       // Detalle 5
    $('#detalle6').val('');       // Detalle 6
    $('#modalEAN').val('');            // EAN
    $('#modalPlan').val('');    // Plan de cuotas
    $('#modalCodCR').val('');    // Cod CR
    $('#modalCR').val('');              // CR
    
    $('#detalleImg1').attr('src', 'iconos/detalles.png');
    $('#detalleImg2').attr('src', 'iconos/Elegir Logo2.png');
    $('#detalleImg3').attr('src', 'iconos/Elegir Logo2.png');
    $('#detalleImg4').attr('src', 'iconos/Elegir Logo2.png');
    $('#detalleImg5').attr('src', 'iconos/Elegir Logo2.png');
    $('#detalleImg6').attr('src', 'iconos/Elegir Logo2.png');

    $('#modalPlan').empty();
    listaPlanes("modalPlan");

  // Verificar que el artículo se encontró en localStorage
  if (articulo) {
    // Cargar los datos en el modal
    $('#modalCod').val(articulo.cod);            // Código
    $('#modalDesc').val(articulo.desc);          // Descripción
    $('#modalProducto').val(articulo.producto);  // Producto
    $('#modalMarca').val(articulo.marca);        // Marca
    $('#detalle1').val(articulo.detalle1);       // Detalle 1
    $('#detalle2').val(articulo.detalle2);       // Detalle 2
    $('#detalle3').val(articulo.detalle3);       // Detalle 3
    $('#detalle4').val(articulo.detalle4);       // Detalle 4
    $('#detalle5').val(articulo.detalle5);       // Detalle 5
    $('#detalle6').val(articulo.detalle6);       // Detalle 6
    $('#modalEAN').val(articulo.ean);            // EAN
    $('#modalPlan').val(articulo.planCuotas);    // Plan de cuotas
    $('#modalCodCR').val(articulo["Cod CR"]);    // Cod CR
    $('#modalCR').val(articulo.cr);              // CR
    
    $('#detalleImg1').attr('src', 'iconos/'+articulo.logo1+'.png');
    $('#detalleImg2').attr('src', 'iconos/'+articulo.logo2+'.png');
    $('#detalleImg3').attr('src', 'iconos/'+articulo.logo3+'.png');
    $('#detalleImg4').attr('src', 'iconos/'+articulo.logo4+'.png');
    $('#detalleImg5').attr('src', 'iconos/'+articulo.logo5+'.png');
    $('#detalleImg6').attr('src', 'iconos/'+articulo.logo6+'.png');

    let planModal = planes.map(x => x[0]).indexOf(articulo.planCuotas);
    $('#modalPlan').empty();
    listaPlanes("modalPlan", planModal);

  } else {
    console.log("Artículo no encontrado en localStorage.");
  }
  
}

/*function guardarArticulo() {
    // Recuperar los valores de los campos del modal
    var codigo = $('#modalCod').val();              // Código
    var descripcion = $('#modalDesc').val();        // Descripción
    var producto = $('#modalProducto').val();       // Producto
    var marca = $('#modalMarca').val();             // Marca
    var detalle1 = $('#detalle1').val();            // Detalle 1
    var detalle2 = $('#detalle2').val();            // Detalle 2
    var detalle3 = $('#detalle3').val();            // Detalle 3
    var detalle4 = $('#detalle4').val();            // Detalle 4
    var detalle5 = $('#detalle5').val();            // Detalle 5
    var detalle6 = $('#detalle6').val();            // Detalle 6
    var ean = $('#modalEAN').val();                 // EAN
    var planCuotas = $('#modalPlan').val();         // Plan de cuotas
    var codCR = $('#modalCodCR').val();            // Cod CR
    var cr = $('#modalCR').val();                  // CR

    // Recuperar las rutas de los logos (si el usuario cambió alguna imagen)
    var logo1 = $('#detalleImg1').attr('src').replace('iconos/', '').replace('.png', '');
    var logo2 = $('#detalleImg2').attr('src').replace('iconos/', '').replace('.png', '');
    var logo3 = $('#detalleImg3').attr('src').replace('iconos/', '').replace('.png', '');
    var logo4 = $('#detalleImg4').attr('src').replace('iconos/', '').replace('.png', '');
    var logo5 = $('#detalleImg5').attr('src').replace('iconos/', '').replace('.png', '');
    var logo6 = $('#detalleImg6').attr('src').replace('iconos/', '').replace('.png', '');

    // Crear el objeto con los datos actualizados
    var articulo = {
        cod: codigo,
        desc: descripcion,
        producto: producto,
        marca: marca,
        detalle1: detalle1,
        detalle2: detalle2,
        detalle3: detalle3,
        detalle4: detalle4,
        detalle5: detalle5,
        detalle6: detalle6,
        ean: ean,
        planCuotas: planCuotas,
        logo1: logo1,
        logo2: logo2,
        logo3: logo3,
        logo4: logo4,
        logo5: logo5,
        logo6: logo6,
        "Cod CR": codCR,
        cr: cr
    };

    // Guardar o actualizar el artículo en localStorage
    //localStorage.setItem(codigo, JSON.stringify(articulo));
    console.log(JSON.stringify(articulo));

    // Opcional: Cerrar el modal después de guardar
    //$('#abmArticulo').modal('hide');

    // Opcional: Mostrar un mensaje de éxito
    //alert('Artículo guardado correctamente!');
}
*/

function guardarArticulo() {
    // Recuperar los valores de los campos del modal
    var codigo = $('#modalCod').val().trim();              // Código
    var descripcion = $('#modalDesc').val().trim();        // Descripción
    var producto = $('#modalProducto').val().trim();       // Producto
    var marca = $('#modalMarca').val().trim();             // Marca
    var detalle1 = $('#detalle1').val().trim();            // Detalle 1
    var ean = $('#modalEAN').val().trim();                 // EAN

    // Limpiar los estilos de error anteriores
    $('#modalCod, #modalProducto, #modalMarca, #detalle1, #modalDesc, #modalEAN').removeClass('input-error');
    $('#error-message').hide(); // Ocultar el mensaje de error anterior

    // Verificar si los campos esenciales están vacíos
    var errores = [];
    if (!codigo) errores.push("El código es obligatorio.");
    if (!producto) errores.push("El producto es obligatorio.");
    if (!marca) errores.push("La marca es obligatoria.");
    if (!detalle1) errores.push("El detalle 1 es obligatorio.");
    if (!descripcion) errores.push("La descripción es obligatoria.");
    if (!ean) errores.push("El EAN es obligatorio.");

    // Si hay errores, mostrar el mensaje en el modal y resaltar los campos vacíos
    if (errores.length > 0) {
        var mensajeError = "Por favor, complete los campos resaltados en rojo";

        // Mostrar el mensaje de error en la interfaz
        $('#error-message').text(mensajeError).show();

        // Resaltar los campos vacíos con un borde rojo
        if (!codigo) $('#modalCod').addClass('input-error');
        if (!producto) $('#modalProducto').addClass('input-error');
        if (!marca) $('#modalMarca').addClass('input-error');
        if (!detalle1) $('#detalle1').addClass('input-error');
        if (!descripcion) $('#modalDesc').addClass('input-error');
        if (!ean) $('#modalEAN').addClass('input-error');

        return; // Detener la ejecución de la función
    }

    // Recuperar las rutas de los logos (si el usuario cambió alguna imagen)
    var logo1 = $('#detalleImg1').attr('src').replace('iconos/', '').replace('.png', '');
    var logo2 = $('#detalleImg2').attr('src').replace('iconos/', '').replace('.png', '');
    var logo3 = $('#detalleImg3').attr('src').replace('iconos/', '').replace('.png', '');
    var logo4 = $('#detalleImg4').attr('src').replace('iconos/', '').replace('.png', '');
    var logo5 = $('#detalleImg5').attr('src').replace('iconos/', '').replace('.png', '');
    var logo6 = $('#detalleImg6').attr('src').replace('iconos/', '').replace('.png', '');

    // Crear el objeto con los datos actualizados
    var articulo = {
        cod: codigo,
        desc: descripcion,
        producto: producto,
        marca: marca,
        detalle1: detalle1,
        detalle2: $('#detalle2').val().trim(),
        detalle3: $('#detalle3').val().trim(),
        detalle4: $('#detalle4').val().trim(),
        detalle5: $('#detalle5').val().trim(),
        detalle6: $('#detalle6').val().trim(),
        ean: ean,
        planCuotas: $('#modalPlan').val().trim(),
        logo1: logo1,
        logo2: logo2,
        logo3: logo3,
        logo4: logo4,
        logo5: logo5,
        logo6: logo6,
        "Cod CR": $('#modalCodCR').val().trim(),
        cr: $('#modalCR').val().trim()
    };

    // Guardar o actualizar el artículo en localStorage
    localStorage.setItem(codigo, JSON.stringify(articulo)); 

    // Opcional: Cerrar el modal después de guardar
    //$('#abmArticulo').modal('hide');

    // Opcional: Mostrar un mensaje de éxito
    alert('Artículo guardado correctamente!');
}

