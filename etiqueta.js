
console.log(sessionStorage["numeroFilas"])

for (let i = 1; i < sessionStorage["numeroFilas"]; i++) {
    if (sessionStorage[i].length > 2){
        let articuloImpresioin = JSON.parse(sessionStorage[i]);
        let codigo = articuloImpresioin["cod"];
        let desc = articuloImpresioin["desc"];
        let plan = articuloImpresioin["plan"];
        let articuloBD = (localStorage[codigo] ? JSON.parse(localStorage[codigo]) : 0)
        let cuotas = JSON.parse(localStorage[plan])
        let producto = (articuloBD != 0 ? articuloBD["producto"] : "")
        let marca = (articuloBD != 0 ? articuloBD["marca"] : desc)
        let ean = (articuloBD != 0 ? articuloBD["ean"] : "")
        let detalle1 = (articuloBD["detalle1"] ? articuloBD["detalle1"] : "")
        let detalle2 = (articuloBD["detalle2"] ? articuloBD["detalle2"] : "")
        let detalle3 = (articuloBD["detalle3"] ? articuloBD["detalle3"] : "")
        let detalle4 = (articuloBD["detalle4"] ? articuloBD["detalle4"] : "")
        let detalle5 = (articuloBD["detalle5"] ? articuloBD["detalle5"] : "")
        let detalle6 = (articuloBD["detalle6"] ? articuloBD["detalle6"] : "")
        let total = Number(articuloImpresioin["total"]) //Precio total formato numero
        let precioTotal = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(articuloImpresioin["total"])
        let conGarantia = (articuloImpresioin["cr"]>0 ? "PRECIO CON 2 AÑOS DE GARANTIA" : "")
        let precioContado = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(articuloImpresioin["precio"])
        let logo1 = (articuloBD["logo1"] ? articuloBD["logo1"] : "Elegir Logo")
        let logo2 = (articuloBD["logo2"] ? articuloBD["logo2"] : "Elegir Logo")
        let logo3 = (articuloBD["logo3"] ? articuloBD["logo3"] : "Elegir Logo")
        let logo4 = (articuloBD["logo4"] ? articuloBD["logo4"] : "Elegir Logo")
        let logo5 = (articuloBD["logo5"] ? articuloBD["logo5"] : "Elegir Logo")
        let logo6 = (articuloBD["logo6"] ? articuloBD["logo6"] : "Elegir Logo")
        let logoTarjeta1 = cuotas["tarjeta1"];
        let logoTarjeta2 = cuotas["tarjeta2"];
        let logoTarjeta3 = cuotas["tarjeta3"];
        let colorTarjeta1 = cuotas["colorTarjeta1"]
        let colorTarjeta2 = cuotas["colorTarjeta2"]
        let colorTarjeta3 = cuotas["colorTarjeta3"]
        let cantCuotas1 = cuotas["cuotas1"];
        let cantCuotas2 = cuotas["cuotas2"];
        let cantCuotas3 = cuotas["cuotas3"];
        let precioCuota1
        let precioCuota2
        let precioCuota3
        let leyendaInteres1
        let leyendaInteres2
        let leyendaInteres3
        let interes1 = cuotas["interes1"];
        let interes2 = cuotas["interes2"];
        let interes3 = cuotas["interes3"];
        if (interes1 > 0) {
            cuota1 = (((total*interes1)/100)+total)/cantCuotas1
            leyendaInteres1 = "CUOTAS FIJAS"
        }else{
            cuota1 = total/cantCuotas1
            leyendaInteres1 = "CUOTAS SIN INTERES"
        }
        if (interes2 > 0) {
            cuota2 = (((total*interes2)/100)+total)/cantCuotas2
            leyendaInteres2 = "CUOTAS FIJAS"
        }else{
            cuota2 = total/cantCuotas2
            leyendaInteres2 = "CUOTAS SIN INTERES"
        }
        if (interes3 > 0) {
            cuota3 = (((total*interes3)/100)+total)/cantCuotas3
            leyendaInteres3 = "CUOTAS FIJAS"
        }else{
            cuota3 = total/cantCuotas3
            leyendaInteres3 = "CUOTAS SIN INTERES"
        }
        precioCuota1 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(cuota1)
        precioCuota2 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(cuota2)
        precioCuota3 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}).format(cuota3)

        let etiqueta = ''+
        '<div class="box eti">'+
                ' <div class="logo">'+
                '<div class="part1">'+
                '  <h5>'+producto+'</h5>'+
                '<span>'+codigo+'</span>'+
                ' </div>'+
                    ' <div class="part2">'+
                        '   <h1>'+marca+'</h1>'+
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
                        '<div class="descripcion">'+desc+'</div>'+
                            '<div class="ean">'+ean+'</div>'+
                        '</div>'+
                        
                        '<div class="part5">'+
                        '<div class="precio">'+precioTotal+'</div>'+
                        '</div>'+
                        '<div class="part6">'+
                            '<div class="leyendaGarantia">'+conGarantia+'</div>'+
                        '</div>'+
                        '<div class="part7" style="background-color: '+colorTarjeta1+'">'+
                            '<div class="logoTarjeta"><img src="iconos/'+logoTarjeta1+'.png" width="80" height="36"></div>'+
                            '<div class="cuotas">'+cantCuotas1+'</div>'+
                            '<div class="interes">'+leyendaInteres1+'</div>'+
                            '<div class="precioCuota">'+precioCuota1+'</div>'+
                        '</div>'+
                        '<div class="part8" style="background-color: '+colorTarjeta2+'">'+
                            '<div class="logoTarjeta"><img src="iconos/'+logoTarjeta2+'.png" width="80" height="36"></div>'+
                            '<div class="cuotas">'+cantCuotas2+'</div>'+
                            '<div class="interes">'+leyendaInteres2+'</div>'+
                            '<div class="precioCuota">'+precioCuota2+'</div>'+
                        '</div>'+
                        '<div class="part9" style="background-color: '+colorTarjeta3+'">'+
                            '<div class="logoTarjeta"><img src="iconos/'+logoTarjeta3+'.png" width="80" height="36"></div>'+
                            '<div class="cuotas">'+cantCuotas3+'</div>'+
                            '<div class="interes">'+leyendaInteres3+'</div>'+
                            '<div class="precioCuota">'+precioCuota3+'</div>'+
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
    }
}


let fecha = new Date().toLocaleString();
$( ".part12" ).html( fecha );


window.print();

window.addEventListener("afterprint", function() {
    window.close();
});
