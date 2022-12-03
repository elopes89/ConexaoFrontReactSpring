import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    marca: ""
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjetoProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8000/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  //Obtendo os dados do formulário
  const aoDigitar = (e) => {
    // console.log(e.target)
    setObjetoProduto({ ...objProduto, [e.target.name]: e.target.value })
  }

  //Cadastrar Produto
  const cadastrar = () => {
    fetch('http://localhost:8000/cadastrar', {
      method: "post",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json"
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem)
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert("cadastro efetuado")
          limparFormulario()
        }
      })
  }

  //Remover produto
  const remover = () => {
    fetch('http://localhost:8000/remover/'+objProduto.codigo, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json"
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        alert(retorno_convertido.mensagem);

        //copia vetor produtos

        let vetorTemp = [...produtos];

        //Índice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //Remover produto do vetorTemp
        vetorTemp.splice(indice, 1);


        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        limparFormulario();


      })
  }

  //Alterar Produto
  const alterar = () => {
    fetch('http://localhost:8000/alterar', {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json"
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem)
        } else {

          //copia vetor produtos

          let vetorTemp = [...produtos];

          //Índice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          //Alterar produto do vetorTemp
          vetorTemp[indice] = objProduto;


          //Atualizar o vetor de produtos
          setProdutos(vetorTemp);


          //Mensagem
          alert("cadastro efetuado")
          limparFormulario()
        }
      })
  }
  //Limpar Formulário
  const limparFormulario = () => {
    setObjetoProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionar Produto
  const SelecionarProduto = (indice) => {
    setObjetoProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div className="App">
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar}
        cadastrar={cadastrar} obj={objProduto} remover={remover}
        cancelar={limparFormulario} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={SelecionarProduto} />
    </div>
  );
}

export default App;
