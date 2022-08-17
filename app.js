const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar, mostrarListadoCheckList } = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  console.log("Hola mundo");

  var opt = "";
  const tareas = new Tareas();

  const tareasdb = leerDB();

  if (tareasdb) {
    tareas.cargarTareasFromArray(tareasdb);
    //Establecer las tareas
  }

  do {
    //Imprime el menu
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        console.log(desc);

        break;
      case "2":
        tareas.listadoCompleto();

        break;

      case "3": //Listar completadas
        tareas.listarPendientesCompletadas(true);

        break;

      case "4": // Listar pendientes
        tareas.listarPendientesCompletadas(false);

        break;
        case "5": // Completado | Pendiente
        const ids= await mostrarListadoCheckList (tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        ;

        break;
        
        case "6": // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== '0'){
        const ok = await confirmar('¿Esta seguro que desea borrar esta tarea?')
        
        if (ok){
          tareas.borrarTarea(id);
          console.log('Tarea borrada')
        }

        break;
    }
  }
    guardarDB(tareas.listadoArr);

    /* 
    const tarea = new Tarea('Comprar comida');
    const tareas = new Tareas();
    
    tareas._listado[tarea.id]=tarea;
    
    console.log(tarea);

    console.log(tareas) */

    await pausa();
  } while (opt !== "0");
};

main();
