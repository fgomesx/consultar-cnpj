import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import './style.css';
import api from "./services/api";

// Componente para exibir as informações do cnpj com a animação
const TypingText = ({ text }) => {
  return (
    <div>
      <ReactTyped
        style={{ whiteSpace: 'pre-line' }}
        strings={[text]}
        typeSpeed={0}
        startDelay={0}
        loop={false}
        cursorChar={"_"}
      />
    </div>
  );
};

function App() {

  const [input, setInput] = useState(''); // Gerenciar o valor do input de CNPJ
  const [cnpj, setCnpj] = useState({}); // Armazenar os dados do CNPJ retornados pela API
  const [cnpjText, setCnpjText] = useState(''); // Armazenar o texto formatado com as informações do CNPJ

  async function handleSearch() { // Buscar os dados do CNPJ na API
    if (input === '') {
      alert("Insira um CNPJ!")
      return;
    }

    try { // Faz a requisição à API com o CNPJ fornecido
      const response = await api.get(`${input}`);
      setCnpj(response.data);
     

      // As informações do CNPJ para exibição
      const text = `
        <b>Razão Social:</b> ${response.data.razao_social} \n
        <b>Nome Fantasia:</b> ${response.data.nome_fantasia} \n\n
        <b>Natureza Jurídica:</b> ${response.data.codigo_natureza_juridica} - ${response.data.natureza_juridica} \n
        <b>Tipo:</b> ${response.data.descricao_identificador_matriz_filial} | <b>Porte:</b> ${response.data.porte} \n
        <b>Abertura:</b> ${response.data.data_inicio_atividade} (AAA-MM-DD) | <b>Situação Cadastral:</b> ${response.data.descricao_situacao_cadastral} \n
        <b>Endereço:</b> ${response.data.descricao_tipo_de_logradouro} ${response.data.logradouro}, ${response.data.numero}, ${response.data.complemento}, ${response.data.bairro}, ${response.data.cep}, ${response.data.municipio} - ${response.data.uf} \n
        <b>E-mail:</b> ${response.data.email} | <b>Telefone:</b> ${response.data.ddd_telefone_1} / ${response.data.ddd_telefone_2} \n\n
        <b>Atividade Econômica Principal:</b>
        - ${response.data.cnae_fiscal}: ${response.data.cnae_fiscal_descricao} \n\n
        <b>Atividades Econômicas Secundárias:</b>
        ${response.data.cnaes_secundarios.map(cnae => `- ${cnae.codigo}: ${cnae.descricao}`).join('\n\n')}
      `;

      setCnpjText(text.trim());

      setInput("");
    } catch {
      alert("CNPJ inválido!");
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        <ReactTyped
          strings={[`&lt;data.cnpj&gt;`, `Consultar CNPJ`]}
          typeSpeed={30}
          backSpeed={30}
          backDelay={500}
          loop={false}
          cursorChar={"_"}
        />
      </h1>

      <div className="containerInput">
        <input
          type="number"
          placeholder="Insira um CNPJ..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          title="Somente números."
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cnpj).length > 0 && (

        <main className="main">

          <div className="window-header">
            <div className="window-buttons">
              <div className="window-button close"></div>
              <div className="window-button minimize"></div>
              <div className="window-button maximize"></div>

            </div>
            <p className="title-bar">CNPJ: {cnpj.cnpj}</p>
            <div className="spacer"></div>
          </div>

          <div className="window-content">
            <TypingText text={cnpjText} />
          </div>

        </main>
      )}

      <footer className="footer">
        <p>Powered by FGOMESX |
          <a href="https://github.com/fgomesx" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ marginLeft: '5px' }} />
          </a>
        </p>
      </footer>

    </div>
  );
}

export default App;
