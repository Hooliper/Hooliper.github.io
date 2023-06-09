
console.log(sessionStorage["numeroFilas"])


let articuloImpresioin = JSON.parse(sessionStorage[2]);
let codigo = articuloImpresioin["cod"];
let articuloBD = JSON.parse(localStorage[codigo]);
let detalle1 = (articuloBD["detalle1"] ? articuloBD["detalle1"] : "")
let detalle2 = (articuloBD["detalle2"] ? articuloBD["detalle2"] : "")
let detalle3 = (articuloBD["detalle3"] ? articuloBD["detalle3"] : "")
let detalle4 = (articuloBD["detalle4"] ? articuloBD["detalle4"] : "")
let detalle5 = (articuloBD["detalle5"] ? articuloBD["detalle5"] : "")
let detalle6 = (articuloBD["detalle6"] ? articuloBD["detalle6"] : "")
let precioTotal = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(articuloImpresioin["total"])
let conGarantia = (articuloImpresioin["cr"]>0 ? "PRECIO CON 2 AÑOS DE GARANTIA" : "")
let precioContado = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(articuloImpresioin["precio"])
let logo1 = (articuloBD["logo1"] ? articuloBD["logo1"] : "Elegir Logo")
let logo2 = (articuloBD["logo2"] ? articuloBD["logo2"] : "Elegir Logo")
let logo3 = (articuloBD["logo3"] ? articuloBD["logo3"] : "Elegir Logo")
let logo4 = (articuloBD["logo4"] ? articuloBD["logo4"] : "Elegir Logo")
let logo5 = (articuloBD["logo5"] ? articuloBD["logo5"] : "Elegir Logo")
let logo6 = (articuloBD["logo6"] ? articuloBD["logo6"] : "Elegir Logo")

let etiqueta = ''+
'<div class="box eti">'+
           ' <div class="logo">'+
           '<div class="part1">'+
                  '  <h5>'+articuloBD["producto"]+'</h5>'+
                    '<span>'+codigo+'</span>'+
               ' </div>'+
               ' <div class="part2">'+
                 '   <h1>'+articuloBD["marca"]+'</h1>'+
               ' </div>'+
               ' <div class="part3">'+
                   ' <div class="detalle">'+
                       ' <img src="iconos/'+logo1+'.png" width="40" height="40">'+
                       ' <div>'+detalle1+'</div>'+
                    '</div>'+
                    
                    '<div class="divisionDetalles" style="width: 1px"></div>'+

                    '<div class="detalle">'+
                        '<img src="iconos/'+logo2+'.png" width="40" height="40">'+
                        '<div>'+detalle2+'</div>'+
                        '</div>'+

                        '<div class="divisionDetalles" style="width: 1px"></div>'+
                        
                        '<div class="detalle">'+
                        '<img src="iconos/'+logo3+'.png" width="40" height="40">'+
                        '<div>'+detalle3+'</div>'+
		            '</div>'+
                '</div>'+
                '<div class="divisionDetalles" style="height: 1px"></div>'+
                '<div class="part3b">'+
                    '<div class="detalle">'+
                        '<img src="iconos/'+logo4+'.png" width="40" height="40">'+
                        '<div>'+detalle4+'</div>'+
                    '</div>'+

                    '<div class="divisionDetalles" style="width: 1px"></div>'+

                    '<div class="detalle">'+
                        '<img src="iconos/'+logo5+'.png" width="40" height="40">'+
                        '<div>'+detalle5+'</div>'+
		            '</div>'+
                    
                    '<div class="divisionDetalles" style="width: 1px"></div>'+
                    
                    '<div class="detalle">'+
                        '<img src="iconos/'+logo6+'.png" width="40" height="40">'+
                        '<div>'+detalle6+'</div>'+
                    '</div>'+
                '</div>'+
                        
                '<div class="part4">'+
                '<div class="descripcion">'+articuloBD["desc"]+'</div>'+
                    '<div class="ean">'+articuloBD["ean"]+'</div>'+
                '</div>'+
                
                '<div class="part5">'+
                '<div class="precio">'+precioTotal+'</div>'+
                '</div>'+
                '<div class="part6">'+
                    '<div class="leyendaGarantia">'+conGarantia+'</div>'+
                '</div>'+
                '<div class="part7">'+
                    '<div class="logoTarjeta"><img src="iconos/hipotecario.png" width="80" height="36"></div>'+
                    '<div class="cuotas">12</div>'+
                    '<div class="interes">CUOTAS SIN INTERES</div>'+
                    '<div class="precioCuota">$ 99.999,99</div>'+
                '</div>'+
                '<div class="part8">'+
                    '<div class="logoTarjeta"><img src="iconos/naranja.png" width="80" height="36"></div>'+
                    '<div class="cuotas">12</div>'+
                    '<div class="interes">CUOTAS SIN INTERES</div>'+
                    '<div class="precioCuota">$ 99.999,99</div>'+
                '</div>'+
                '<div class="part9">'+
                    '<div class="logoTarjeta"><img src="iconos/visaMaster.png" width="80" height="36"></div>'+
                    '<div class="cuotas">12</div>'+
                    '<div class="interes">CUOTAS SIN INTERES</div>'+
                    '<div class="precioCuota">$ 99.999,99</div>'+
                '</div>'+
                '<div class="part10">'+
                    '<div>Consultar por otros planes de financiación</div>'+
                '</div>'+
                '<div class="part11">'+
                    '<span>Precio contado con garantía de fábrica</span>'+
                    '<div style="width: 3%;"></div>'+
                    '<div>'+
                        '<div class="precioContado">'+precioContado+'</div>'+
                    '</div>'+
                '</div>'+
                '<div class="part12"></div>'+
	        '</div>'+
        '</div>';

$('.container').append(etiqueta)





let fecha = new Date().toLocaleString();
$( ".part12" ).html( fecha );

/*
window.print();

window.addEventListener("afterprint", function() {
    window.close();
});
*/