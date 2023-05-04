
  
const buscarAve = (inputAnilha) => {
  // console.log(anilha)
  let url = 'http://127.0.0.1:5000/plantel/localizar?anilha=' + inputAnilha;
  fetch(url, {
    method: 'get'
  })
  .then((response) => response.json())
  .then((data) => { 
    
    return exibirAve(data)

    }),(err)=>{
      return exibirAve({"erro" : 404})
    }
}

function exibirAve(ave){
  console.log(ave.mesage);
  if(ave.mesage != 'Número de anilha não localizada no banco de dados.'){    
    $('#anilha').text(ave.anilha);
    $('#especie').text(ave.especie);
    $('#mutacao').text(ave.mutacao);
    $('#sexo').text(ave.sexo);
    $('#data_nascimento').text(ave.data_nascimento);
    $('#modal').modal('show');
    
  }else{
    $('#msgErro').text(ave.mesage);
    $('#erro').modal('show');


    
  }
}

const getItem = () => {
  let inputAnilha = document.getElementById("buscarAnilha").value; 
  buscarAve(inputAnilha)
}


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/


const getList = async () => {
  let url = 'http://127.0.0.1:5000/plantel/listar';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => { 
      data.aves.forEach(ave => insertList(ave.anilha, ave.especie, 
        ave.mutacao, ave.sexo, ave.data_nascimento))
      console.log(response)
      })
      // .catch((error) => {
    //   console.error('Error:', error);
    // });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar uma ave na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputAnilha, inputEspecie, inputMutacao, inputSexo, inputDataNascimento) => {
  const formData = new FormData();
  formData.append('anilha', inputAnilha);
  formData.append('especie', inputEspecie);
  formData.append('mutacao', inputMutacao);
  formData.append('sexo', inputSexo);
  formData.append('data_nascimento', inputDataNascimento);


  let url = 'http://127.0.0.1:5000/plantel/cadastrar';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para update um botão close para cada ave da lista
  --------------------------------------------------------------------------------------
*/
const updateButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D8");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}



/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada ave da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}



/*
  --------------------------------------------------------------------------------------
  Função para update o registro de uma ave de acordo com o click no botão update
  --------------------------------------------------------------------------------------
*/
const updateElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja atualiza os dados?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}






/*
  --------------------------------------------------------------------------------------
  Função para remover o registro de uma ave de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja apagar o registro dessa ave?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Registro apagado da base de dados!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/plantel/deletar?anilha=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputAnilha = document.getElementById("newAnilha").value;
  let inputEspecie = document.getElementById("newEspecie").value;
  let inputMutacao = document.getElementById("newMutacao").value;
  let inputSexo = document.getElementById("newSexo").value;
  let inputDataNascimento = document.getElementById("newNascimento").value;


  if (inputAnilha === '') {
    alert("Escreva o Número da Anilha da Ave!");
  // } else if (inputEspecie === '') {
  //   alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputAnilha, inputEspecie, inputMutacao, inputSexo, inputDataNascimento)
    postItem(inputAnilha, inputEspecie, inputMutacao, inputSexo, inputDataNascimento)
    alert("Ave cadastrada com sucesso!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (anilha, especie, mutacao, sexo, data_nascimento) => {
  var item = [anilha, especie, mutacao, sexo, data_nascimento]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newAnilha").value = "";
  document.getElementById("newEspecie").value = "";
  document.getElementById("newMutacao").value = "";
  document.getElementById("newSexo").value = "";
  document.getElementById("newNascimento").value = "";

  removeElement()

}