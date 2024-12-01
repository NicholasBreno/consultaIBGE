const API_ESTADOS = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const API_MUNICIPIOS = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

document.addEventListener("DOMContentLoaded", () => {
const statesDropdown = document.getElementById("states");
const municipiosList = document.getElementById("municipiosList");
const stateForm = document.getElementById("stateForm");


const fetchEstados = async () => {
    try {
    const response = await fetch(API_ESTADOS);
    const estados = await response.json();
    populateEstados(estados);
    } catch (error) {
    console.error("Erro ao buscar estados:", error);
    }
};


const populateEstados = (estados) => {
    estados.sort((a, b) => a.nome.localeCompare(b.nome));
    estados.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado.sigla;
    option.textContent = `${estado.nome} (${estado.sigla})`;
    statesDropdown.appendChild(option);
    });
};


const fetchMunicipios = async (uf) => {
    try {
    const response = await fetch(`${API_MUNICIPIOS}/${uf}/municipios`);
    const municipios = await response.json();
    renderMunicipios(municipios);
    } catch (error) {
    console.error("Erro ao buscar municípios:", error);
    }
};


const renderMunicipios = (municipios) => {
    municipiosList.innerHTML = "";
    municipios.forEach((municipio) => {
    const li = document.createElement("li");
    li.textContent = municipio.nome;
    municipiosList.appendChild(li);
    });
};


stateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const uf = statesDropdown.value;
    if (uf) {
    fetchMunicipios(uf);
    }
});


fetchEstados();
});
