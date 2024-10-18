import React, { useState, useEffect } from 'react';
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import ItemsAnimals from "../../../Components/ItemsAnimals/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from '../../../Components/API/APIip.jsx';

export default function DoadorasCadastradas() {
    const [doadoras, setDoadoras] = useState([])
    const [filteredDoadoras, setFilteredDoadoras] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('Todas as doadoras')

    const fetchDoadoras = async () => {
        try {
            const response = await fetch(`http://${IPAdress}/donor`)
            const data = await response.json()
            setDoadoras(data)
            setFilteredDoadoras(data)
        } catch (error) {
            console.error('Erro ao buscar doadoras:', error)
        }
    }

    useEffect(() => {
        fetchDoadoras()
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        let filtered = doadoras

        if (searchTerm) {
            filtered = filtered.filter((doadora) =>
                doadora.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filter === "Maior média de oócitos viáveis") {
            filtered = filtered.sort((a, b) => b.averageViableOocytes - a.averageViableOocytes)
        } else if (filter === "Maior porcentagem de embriões") {
            filtered = filtered.sort((a, b) => b.averageEmbryoPercentage - a.averageEmbryoPercentage)
        }

        setFilteredDoadoras(filtered)
    }, [filter, searchTerm, doadoras])

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: '40vh', width: '100%' }}>
                    <PageName page="Doadoras Cadastradas" />
                    <div className={styles.topDiv}>
                        <label htmlFor="filter" style={{ marginRight: '1rem' }}>Filtrar por:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="Todas as doadoras">Todas as doadoras</option>
                            <option value="Maior média de oócitos viáveis">Maior média de oócitos viáveis</option>
                            <option value="Maior porcentagem de embriões">Maior porcentagem de embriões</option>
                        </select>
                        <label className={styles.label} htmlFor="search">Pesquisar doadora (Identificação):</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="search"
                            placeholder="Identificação da doadora"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
                        {filteredDoadoras.map(doadora => (
                            <ItemsAnimals key={doadora.id} data={{ ...doadora, type: "donor" }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
