const input = document.getElementById('input-add');

const divElemento = document.querySelector('.task');


const modalEditar = document.querySelector('.modal-editar')



const tareas = [
  {
    id: Math.floor(Math.random() * 100),
    tarea: "Realizar las compras para la semana",
    estado: false
  },
  {
    id: Math.floor(Math.random() * 100),
    tarea: "Hacer el trabajo final",
    estado: false
  },
  {
    id: Math.floor(Math.random() * 100),
    tarea: "Revisar el codigo",
    estado: false
  },
];

window.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value !== "") {
    agregarTarea(input)
    input.value = "";
    mostrarTareas(tareas);
    tareaRealizada();
    eliminarTarea();
    editarTarea()
  }
})

//editar

const agregarTarea = (input) => {
  const tareaUsuario = {
    id: Math.floor(Math.random() * 100),
    tarea: input.value,
    estado: false
  }
  tareas.push(tareaUsuario);
}
const mostrarTareas = (array) => {
  const tareasAgregadas = array.map(element => {
    return `
    <div data-id="${element.id}" class="task__item">
      <div class="task__text">
        ${element.tarea}
      </div>
      <div class="buttons-container">
        <button class="buttons__item"><i class=" checks fa-solid fa-circle-play"></i></button>
        <button class="buttons__item"><i class="edits fa-solid fa-square-pen"></i></button>
        <button class="buttons__item"><i class="remover fa-solid fa-square-minus"></i></button>
      </div>
  </div>
        `;
  })
  divElemento.innerHTML = tareasAgregadas.join("");

}

const tareaRealizada = () => {
  const checks = document.querySelectorAll('.checks')
  const items = document.querySelectorAll('.task__item')
  checks.forEach(e => {
    e.addEventListener('click', () => {
      let padre = e.parentElement.parentNode.parentElement;
      let id = padre.getAttribute('data-id');
      e.className = "fa-solid fa-pause";
      e.style.color = "#66c195";
      tareas.map(ele => {
        if (ele.id == id) {
          ele.estado = true;
          items.forEach(element => {
            element.classList.toggle('start')
            if (items.length == 1) {
              console.log(items);
              padre.classList.toggle('start-1')
            } else {
              padre.classList.remove('start')
            }
          })
          const ocultarElementos = document.querySelectorAll('.start');
          if (ocultarElementos.length == 0) {
            e.className = "fa-solid fa-circle-play";
            e.style.color = "#937dc2";
          }
        }

      })
    })
  })
}

const eliminarTarea = () => {
  const removerBtn = document.querySelectorAll('.remover')
  removerBtn.forEach(e => {
    e.addEventListener('click', () => {
      let id = e.parentElement.parentNode.parentElement.getAttribute('data-id');
      let elementPadre = e.parentElement.parentNode.parentElement;
      tareas.map(e => {
        if (e.id == id) {
          let indice = tareas.indexOf(e);
          elementPadre.classList.add('remove')
          setTimeout(() => {
            tareas.splice(indice, 1);
            mostrarTareas(tareas)
            eliminarTarea();
            tareaRealizada();
            editarTarea()
          }, 500);
        }
      })
    })
  })
}
const editarTarea = () => {
  const editarInput = document.querySelector('.modal__input');
  const editarIcono = document.querySelectorAll('.edits');
  const cerrarModal = document.getElementById('cerrar-modal')
  const btnEditar = document.getElementById('modal-btn')

  editarIcono.forEach(e => {
    e.addEventListener('click', () => {
      modalEditar.classList.add('modal-editar-active');
      let obtenerDatos = e.parentElement.parentNode.parentNode;
      let id = Number(obtenerDatos.getAttribute('data-id'));
      let texto = obtenerDatos.firstElementChild.textContent;
      editarInput.value = texto.trim();

      btnEditar.addEventListener('click', () => {
        tareas.map(element => {
          if (element.id === id) {
            element.tarea = editarInput.value;
            mostrarTareas(tareas);
            tareaRealizada();
            eliminarTarea();
            editarTarea();
            console.log(tareas);
          }
        })
      })
      window.addEventListener('submit', () => {
        modalEditar.classList.remove('modal-editar-active')
      })
    })
  })
  cerrarModal.addEventListener('click', () => {
    console.log('cerrar');
    modalEditar.classList.remove('modal-editar-active')
  })
}
mostrarTareas(tareas)
tareaRealizada()
eliminarTarea()
editarTarea()
