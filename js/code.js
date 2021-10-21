var input_nombre = document.getElementById("ne_user")
var input_codigo = document.getElementById("c_user")
var input_correo = document.getElementById("ce_user")

function guardar_datos(){
    var contador_datos = 1
    
    if(localStorage.getItem("contador")== null){
       localStorage.setItem("contador", contador_datos)
    }else{
        contador_datos = localStorage.getItem("contador")
    } 

var nombre = document.getElementById("ne_user").value
var codigo = document.getElementById("c_user").value
var correo = document.getElementById("ce_user").value
    
localStorage.setItem("nombre"+contador_datos, nombre)
localStorage.setItem("codigo"+contador_datos, codigo)
localStorage.setItem("correo"+contador_datos, correo)
contador_datos = parseInt(contador_datos) + 1
localStorage.setItem("contador", contador_datos) 
console.log(contador_datos)

var contador_actual = parseInt(contador_datos)-1
listado_estudiantes(contador_actual)
document.getElementById("formulario").reset()
}

function listado_estudiantes(contador_actual = 1, actualiza_tabla = false){ 
var body_tabla = document.getElementById("datos-estudiantes-read")
var titulo_formulario = document.getElementById("titulo_accion_formulario")
titulo_formulario.innerHTML = "Insertar dato nuevo"


if(actualiza_tabla){
    var contador_futuro = localStorage.getItem("contador")
    for (let x = 1; x < contador_futuro; x++) {
        if(localStorage.getItem("nombre" + x) != null && localStorage.getItem("codigo" + x) !=null && localStorage.getItem("correo" + x) !=null)
        body_tabla.innerHTML += ` 
        <tr>
        <td>${localStorage.getItem("nombre"+x)}</td> 
        <td>${localStorage.getItem("codigo"+x)}</td>
        <td>${localStorage.getItem("correo"+x)}</td>
        <td>
        <i class="fas fa-edit mx-2" onclick="editar_campo(${x})"></i>
        <i class="fas fa-trash mx-2" onclick="borrar_campo(${x})"></i>
        </td>
        </tr>
        `  
    }
}else{
    body_tabla.innerHTML += `
<tr>
<td>${localStorage.getItem("nombre"+contador_actual)}</td> 
<td>${localStorage.getItem("codigo"+contador_actual)}</td>
<td>${localStorage.getItem("correo"+contador_actual)}</td>
<td>
<i class="fas fa-edit mx-2" onclick="editar_campo(${contador_actual})"></i>
<i class="fas fa-trash mx-2" onclick="borrar_campo(${contador_actual})"></i>
</td>
</tr>
`
}
}
listado_estudiantes(1,true)

function editar_campo(indice_dato){
    console.log(indice_dato) 
var boton = document.getElementById("boton_formulario")
boton.setAttribute("onclick", `editar_campo_actualizacion(${indice_dato})`) 

var titulo_formulario = document.getElementById("titulo_accion_formulario")
titulo_formulario.innerHTML = `Actualizar dato`


input_nombre.value = localStorage.getItem("nombre" + indice_dato)
input_codigo.value = localStorage.getItem("codigo" + indice_dato)
input_correo.value = localStorage.getItem("correo" + indice_dato)


console.log(input_nombre)
console.log(input_codigo)
console.log(input_correo)
}

function editar_campo_actualizacion(indice_dato){
    console.log(indice_dato)

    var nombre_a = document.getElementById("ne_user").value
    var codigo_a = document.getElementById("c_user").value
    var correo_a = document.getElementById("ce_user").value

    localStorage.setItem("nombre" + indice_dato, nombre_a)
    localStorage.setItem("codigo" + indice_dato, codigo_a)
    localStorage.setItem("correo" + indice_dato, correo_a)

    var body_tabla = document.getElementById("datos-estudiantes-read")
    body_tabla.innerHTML = ""

    var titulo_formulario = document.getElementById("titulo_accion_formulario")
    titulo_formulario.innerHTML = `Insertar dato nuevo`

    listado_estudiantes(1,true)
    var boton = document.getElementById("boton_formulario")
boton.setAttribute("onclick", `guardar_datos()`)

document.getElementById("formulario").reset()

}

function borrar_campo(x){
    Swal.fire({
        title: 'Esta seguro de eliminar el dato?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            var body_tabla = document.getElementById("datos-estudiantes-read")
            body_tabla.innerHTML = ''

            localStorage.removeItem("nombre" + x)
            localStorage.removeItem("codigo" + x)
            localStorage.removeItem("correo" + x)
            listado_estudiantes(1, true)


            Swal.fire({
                title: 'Se elimino el dato',
                icon: 'success'
            })
            document.getElementById("formulario").reset()
        }
    })
}
    


