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

var numeroFila = 1;

function agregaFilaManual(){
    var cod = $('#codigo').val();
    var descripcion = $('#descripcion').html();
    var precio = $('#precio').val();
    var cr = $('#cr').val();
    //var totalPrecioCr = $('#total').html();
    var planElegido = $('#plan').val();
    var cant = $('#cant').val();
    
    $('#codigo').val('');
    $('#descripcion').html('');
    $('#precio').val('');
    $('#cr').val('');
    $('#total').html('');
    $('#cant').val(1);

    agregaFila(cod, descripcion, precio, cr, planElegido, cant);
}

function agregaFila(cod, descripcion, precio, cr, planElegido, cant){    
    console.log("nuevo");
    var fila = '<tr>'+
                '<td class="celdaAlineadaDerecha">'+numeroFila+'</td>'+
                '<td class="celdaAlineadaDerecha">'+cod+'</td>'+
                '<td class="celdaDesc">'+descripcion+'</td>'+
                '<td class="celdaAlineadaDerecha">'+precio+'</td>'+
                '<td class="celdaAlineadaDerecha">'+cr+'</td>'+
                '<td class="celdaAlineadaDerecha">'+(precio+cr)+'</td>'+
                '<td>'+
                    '<select id="planFila'+numeroFila+'" class="inputSelect form-control">'+
                        
                    '</select>'+
                '<td><input type="number" min="0" max="12" class="inputCant form-control" value="'+cant+'"></td>'+  
                '</td>'+
            '</tr>';

    $('#tabla tbody').append(fila); 
    listaPlanes("planFila"+numeroFila, planElegido)
    numeroFila += 1;
           
}

$('.enterNuevaFila').on('keypress',function(e) {
    if(e.which == 13) {
        $("#divTabla").show(400);
        agregaFilaManual();
    }
});

$('#precio').on('input', (sumaPrecioCr));
    
$('#cr').on('input', (sumaPrecioCr));
    
function sumaPrecioCr(){
    var a = Number($('#precio').val());
    var b = Number($('#cr').val());
    
    $('#total').html(a+b);
}
    
//Oculta la lista de articulos cargados
$("#divTabla").hide();



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
      console.log(result);
      console.log(zzexcel.SheetNames)
      console.log(result[5]["Desc. Articulo"])
    }
};

//FIN LECTOR EXCEL




