import React, { useState, useEffect } from 'react';
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import ItemsAnimals from "../../../Components/ItemsAnimals/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from '../../../Components/API/APIip.jsx';

export default function ReceptorasCadastradas() {
    const [receptoras, setReceptoras] = useState([])
    const [filteredReceptoras, setFilteredReceptoras] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('Todas as receptoras')

    const fetchReceptoras = async () => {
        try {
            const response = await fetch(`http://${IPAdress}/receiver`)
            const data = await response.json()
            setReceptoras(data)
            setFilteredReceptoras(data)
        } catch (error) {
            console.error('Erro ao buscar receptoras:', error)
        }
    };

    useEffect(() => {
        fetchReceptoras()
    }, [])

    const handleDelete = async (id) => {
        console.log("Deletando receptora com ID:", id)
        setFilteredReceptoras((prev) => prev.filter((receptora) => receptora.id !== id))
        setReceptoras((prev) => prev.filter((receptora) => receptora.id !== id))
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        let filtered = receptoras;

        if (searchTerm) {
            filtered = filtered.filter((receptora) =>
                receptora.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filter === "Maior média de oócitos viáveis") {
            filtered = filtered.sort((a, b) => b.averageViableOocytes - a.averageViableOocytes);
        } else if (filter === "Maior porcentagem de embriões") {
            filtered = filtered.sort((a, b) => b.averageEmbryoPercentage - a.averageEmbryoPercentage);
        }

        setFilteredReceptoras(filtered)
    }, [filter, searchTerm, receptoras])

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: '40vh', width: '100%' }}>
                    <PageName page="Receptoras Cadastradas" />
                    <div className={styles.topDiv}>
                        <label htmlFor="filter" style={{ marginRight: '1rem' }}>Filtrar por:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="Todas as receptoras">Todas as receptoras</option>
                            <option value="Maior média de oócitos viáveis">Maior média de oócitos viáveis</option>
                            <option value="Maior porcentagem de embriões">Maior porcentagem de embriões</option>
                        </select>

                        <label className={styles.label} htmlFor="search">Pesquisar receptora (Identificação):</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="search"
                            placeholder="Identificação da receptora"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
                        {filteredReceptoras.map(receptora => (
                            <ItemsAnimals 
                                key={receptora.id} 
                                data={{ ...receptora, type: "receiver" }} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
