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

function agregaFila(){
    var cod = $('#codigo').val();
    var descripcion = $('#descripcion').html();
    var precio = $('#precio').val();
    var cr = $('#cr').val();
    var totalPrecioCr = $('#total').html();
    var planElegido = $('#plan').val();
    var cant = $('#cant').val();
    
    $('#codigo').val('');
    $('#descripcion').html('');
    $('#precio').val('');
    $('#cr').val('');
    $('#total').html('');
    $('#cant').val(1);
    
    var fila = '<tr>'+
                '<td class="celdaAlineadaDerecha">'+numeroFila+'</td>'+
                '<td class="celdaAlineadaDerecha">'+cod+'</td>'+
                '<td class="celdaDesc">'+descripcion+'</td>'+
                '<td class="celdaAlineadaDerecha">'+precio+'</td>'+
                '<td class="celdaAlineadaDerecha">'+cr+'</td>'+
                '<td class="celdaAlineadaDerecha">'+totalPrecioCr+'</td>'+
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
        agregaFila();
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

$('#formFile').on('change', handleFileLoad = (e) => {
    console.log("dentro");
    if (e.target.files.length > 0) {
        try {
            this.setState({ operationInProgress: true, fileLoadProgress: 0 });
            let file = e.target.files[0];
            let reader = new FileReader();
    
            reader.onload = async function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: "array" });
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
                let dataset = await this.parseFileContent(sheet);
                this.setState({ 
                    dataset: dataset,
                    fileLoaded: true,
                    fileName: file.name,
                    operationInProgress: false
                });
            }.bind(this);
            reader.readAsArrayBuffer(file);
        } catch (exception) {
            this.setState({
                fileLoaded: false,
                fileName: "",
                operationInProgress: false
            });
        }
    } else {
        toast("No files found", { type: "error" });
    }
});


//FIN LECTOR EXCEL




