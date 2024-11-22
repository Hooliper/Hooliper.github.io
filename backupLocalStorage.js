// Función para convertir localStorage a un archivo Excel
function exportLocalStorageToExcel() {
    // Crear un array vacío para almacenar los datos del localStorage
    let data = [];
    
    // Recorrer el localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);

        try {
            // Intentamos parsear el item en caso de que sea un JSON
            let parsedItem = JSON.parse(item);
            // Añadir el objeto parseado al array de datos
            data.push(parsedItem);
        } catch (e) {
            // Si no es un JSON válido, podemos saltarlo o agregarlo como texto
            console.error(`No es un JSON válido: ${key}`);
        }
    }

    // Si no hay datos, no hacer nada
    if (data.length === 0) {
        alert('No se encontraron datos en localStorage para exportar.');
        return;
    }

    // Usar SheetJS para crear un archivo Excel
    const ws = XLSX.utils.json_to_sheet(data); // Convertimos el JSON a una hoja de trabajo
    const wb = XLSX.utils.book_new(); // Creamos un nuevo libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Datos LocalStorage"); // Añadimos la hoja al libro

    // Generar y descargar el archivo Excel
    XLSX.writeFile(wb, 'localStorage.xlsx');
}

// Llamar a la función para exportar los datos
//falta crear boton para llamar a la funcion 
//exportLocalStorageToExcel();
