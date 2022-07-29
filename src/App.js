import './App.css';
import React, { useState } from 'react';
import Formulario from './early/Formulario';
import Gramatica from './early/Gramatica';
import reconhecerPalavra from './early/Algoritmo';
import Dominio from './early/Dominio';

function transformarRegrasDeProducaoEmTexto(regrasDeProducao) {
  let texto = '';
  for (let ladoEsquerdo in regrasDeProducao) {
    for (let ladoDireito of regrasDeProducao[ladoEsquerdo]) {
      texto += `${ladoEsquerdo} -> ${ladoDireito}\n`;
    }
  }
  return texto;
}

/**
 * 
 * @param {string} texto 
 */
function transformarTextoEmRegrasDeProducao(texto) {
  const linhas = texto.split('\n').map(linha => linha.replaceAll(' ', ''));
  const regras = {};
  for (let linha of linhas) {
    if (linha[1] != '-' && linha[2] != '>') {
      continue;
    }
    if (!regras[linha[0]]) {
      regras[linha[0]] = [];
    }
    regras[linha[0]].push(linha.substring(3));    
  }
  return regras;
}

function inferirVariaveisETerminais(regrasDeProducao, simboloInicial) {
  const variaveis = new Set(Object.keys(regrasDeProducao));
  variaveis.add(simboloInicial);

  const terminais = new Set();
  for (let ladoEsquerdo in regrasDeProducao) {
    for (let ladoDireito of regrasDeProducao[ladoEsquerdo]) {
      for (let caracter of ladoDireito) {
        if (!variaveis.has(caracter)) {
          terminais.add(caracter);
        }
      }
    }
  }
  
  return [variaveis, terminais];
}

function App() {
  const [simboloInicial, setSimboloInicial] = useState('');
  const [regrasDeProducao, setRegrasDeProducao] = useState({});
  const [palavra, setPalavra] = useState('');
  const [palavraReconhecida, setPalavraReconhecida] = useState(null);
  const [dominios, setDominios] = useState([]);

  const [variaveis, terminais] = inferirVariaveisETerminais(regrasDeProducao, simboloInicial);

  const atualizarRegrasDeProducao = (texto) => {
    setRegrasDeProducao(transformarTextoEmRegrasDeProducao(texto));
  }

  const executarAlgoritmo = () => {
    setPalavraReconhecida(reconhecerPalavra(palavra, variaveis, terminais, regrasDeProducao, simboloInicial, setDominios));
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">&nbsp;</nav>
      <div className="container">
        <h1 className="my-3 pb-3 border-bottom">Early Parser</h1>
        <div className="row">
          <div className="col col-lg-6">
            <Formulario
              simboloInicial={simboloInicial}
              setSimboloInicial={setSimboloInicial}
              regrasDeProducao={transformarRegrasDeProducaoEmTexto(regrasDeProducao)}
              setRegrasDeProducao={atualizarRegrasDeProducao}
              palavra={palavra}
              setPalavra={setPalavra}
              executarAlgoritmo={executarAlgoritmo}
            />
          </div>
          <div className="col col-lg-6">
            <Gramatica 
              variaveis={variaveis}
              terminais={terminais}
              regrasDeProducao={regrasDeProducao}
              simboloInicial={simboloInicial}
            />
          </div>
        </div>
        <div className="row">
          {dominios.map((dominio, i) => (
            <div className="col-lg-3 pb-4 col-md-3">
              <Dominio indice={i} regras={dominio} key={i}/>
            </div>
          ))}
        </div>
        <div className="row">
          <p>{
            palavraReconhecida == null 
              ? ''
              : palavraReconhecida 
                ? <div className="alert alert-success">Palavra reconhecida</div>
                : <div className="alert alert-danger">Palavra não reconhecida</div>}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
