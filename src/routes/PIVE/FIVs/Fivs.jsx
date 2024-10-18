import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import styles from './styles.module.css';

export default function PIVE() {
    const [selectedOption, setSelectedOption] = useState('')
    const [animalOption, setAnimalOption] = useState('')
    const [productions, setProductions] = useState([])
    const [filteredProductions, setFilteredProductions] = useState([])
    const [filter, setFilter] = useState('Todas as FIVs')
    const [donorSearch, setDonorSearch] = useState('')
    const [bullSearch, setBullSearch] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        fetchProductions()
    }, [])

    const fetchProductions = async (filterOption = 'Todas as FIVs') => {
        let url = "http://18.188.243.197:8080/fiv"

        switch (filterOption) {
            case "Em processo":
                url += "/in-process";
                break;
            case "Coleta de oócitos completa":
                url += "/oocyteCollection-completed";
                break;
            case "FIV completa":
                url += "/completed";
                break;
            default:
                break;
        }

        try {
            const response = await axios.get(url)
            setProductions(response.data)
            setFilteredProductions(response.data)
        } catch (error) {
            console.error('Erro:', error)
            alert("Não foi possível buscar os dados da produção.")
        }
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
        setAnimalOption('')
    }

    const handleAnimalChange = (event) => {
        setAnimalOption(event.target.value)
    }

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value
        setFilter(selectedFilter)
        fetchProductions(selectedFilter)
    };

    const handleDonorSearchChange = (event) => {
        const inputValue = event.target.value
        setDonorSearch(inputValue)

        const filtered = productions.filter(production => 
            production.oocyteCollections.some(oocyte => 
                oocyte.donorCattle.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                oocyte.donorCattle.registrationNumber.toLowerCase().includes(inputValue.toLowerCase())
            )
        )
        setFilteredProductions(filtered);
    }

    const handleBullSearchChange = (event) => {
        const inputValue = event.target.value
        setBullSearch(inputValue)

        const filtered = productions.filter(production => 
            production.oocyteCollections.some(oocyte => 
                oocyte.bull.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                oocyte.bull.registrationNumber.toLowerCase().includes(inputValue.toLowerCase())
            )
        )
        setFilteredProductions(filtered);
    }

    const renderStatus = (status) => {
        const isInProcess = status === "IN_PROCESS";
        const isOocyteCollectionCompleted = status === "OOCYTE_COLLECTION_COMPLETED";
        const isCompleted = status === "COMPLETED";

        return (
            <div>
                <span>{isInProcess ? '❌' : (isOocyteCollectionCompleted ? '✔️' : '❌')} <strong>Coleta dos Oócitos</strong></span>
                <span>{isInProcess || isOocyteCollectionCompleted ? '❌' : (isCompleted ? '✔️' : '❌')} <strong>Embriões</strong></span>
            </div>
        )
    }

    const handleFivClick = (fivId) => {
        navigate('/FIV', { state: { id: fivId } })
    }

    const goToNovaFiv = () => {
        navigate('/NovaFiv');
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: '40vh', width: '100%' }}>
                    <PageName page="PIVE" />
                    <div className={styles.topDiv}>
                        <label>
                            <input 
                                type="radio" 
                                value="Produção" 
                                checked={selectedOption === 'Produção'} 
                                onChange={handleOptionChange}
                            />
                            Produção
                        </label>
                        <label style={{ marginLeft: '1rem' }}>
                            <input 
                                type="radio" 
                                value="Animais" 
                                checked={selectedOption === 'Animais'} 
                                onChange={handleOptionChange}
                            />
                            Animais
                        </label>

                        {selectedOption === 'Produção' && (
                            <div className={styles.sideItem}>
                                <label htmlFor="fivSelect" style={{ marginRight: '1rem' }}>Filtrar FIVs:</label>
                                <select id="fivSelect" value={filter} onChange={handleFilterChange}>
                                    <option value="Todas as FIVs">Todas as FIVs</option>
                                    <option value="Em processo">Em processo</option>
                                    <option value="Coleta de oócitos completa">Coleta de oócitos completa</option>
                                    <option value="FIV completa">FIV completa</option>
                                </select>
                            </div>
                        )}

                        {selectedOption === 'Animais' && (
                            <div className={styles.sideItem}>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="Doadora" 
                                        checked={animalOption === 'Doadora'} 
                                        onChange={handleAnimalChange}
                                    />
                                    Doadora
                                </label>
                                <label style={{ marginLeft: '1rem' }}>
                                    <input 
                                        type="radio" 
                                        value="Touro" 
                                        checked={animalOption === 'Touro'} 
                                        onChange={handleAnimalChange}
                                    />
                                    Touro
                                </label>
                            </div>
                        )}

                        {animalOption === 'Doadora' && (
                            <div className={styles.sideItem}>
                                <label className={styles.label} htmlFor="donorInput">
                                    Identificação da Doadora (Nome ou Registro):
                                </label>
                                <input
                                    id="donorInput"
                                    type="text"
                                    placeholder="Nome ou Registro da Doadora"
                                    className={styles.input}
                                    onChange={handleDonorSearchChange} 
                                />
                            </div>
                        )}

                        {animalOption === 'Touro' && (
                            <div className={styles.sideItem}>
                                <label className={styles.label} htmlFor="bullInput">
                                    Identificação do Touro (Nome ou Registro):
                                </label>
                                <input
                                    id="bullInput"
                                    type="text"
                                    placeholder="Nome ou Registro do Touro"
                                    className={styles.input}
                                    onChange={handleBullSearchChange}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
                        {filteredProductions.map((production) => (
                            <div 
                                className={styles.container} 
                                key={production.id}
                                onClick={() => handleFivClick(production.id)} 
                            >
                                <p><strong>ID:</strong> {production.id}</p>
                                <p><strong>Data Asp:</strong> {production.date}</p>
                                <p><strong>Cliente/Fazenda:</strong> {production.client}/{production.farm}</p>
                                {renderStatus(production.status)} 
                            </div>
                        ))}
                    </div>
                    <button className={styles.button} style={{ position: 'fixed', bottom: '5vh', right: '5vh' }} onClick={goToNovaFiv}>
                        Nova FIV
                    </button>
                </div>
            </div>
        </div>
    )
}
