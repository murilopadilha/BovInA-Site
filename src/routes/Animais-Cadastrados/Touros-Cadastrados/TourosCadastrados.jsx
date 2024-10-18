import React, { useState, useEffect } from 'react';
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import styles from './styles.module.css';
import ItemsAnimals from "../../../Components/ItemsAnimals/index.jsx";
import { IPAdress } from '../../../Components/API/APIip.jsx';

export default function TourosCadastrados() {
    const [filter, setFilter] = useState('Todos os touros')
    const [searchTerm, setSearchTerm] = useState('')
    const [bulls, setBulls] = useState([])
    const [filteredBulls, setFilteredBulls] = useState([])

    const fetchBulls = async () => {
        try {
            const response = await fetch(`http://${IPAdress}/bull`)
            const data = await response.json()
            setBulls(data)
            setFilteredBulls(data)
        } catch (error) {
            console.error("Erro ao buscar touros:", error)
        }
    }

    useEffect(() => {
        fetchBulls()
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleDelete = (id) => {
        setFilteredBulls((prev) => prev.filter((bull) => bull.id !== id))
        setBulls((prev) => prev.filter((bull) => bull.id !== id))
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        let filtered = bulls;

        if (searchTerm) {
            filtered = filtered.filter(bull =>
                bull.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filter === "Maior porcentagem de embriões") {
            filtered = filtered.sort((a, b) => b.averageEmbryoPercentage - a.averageEmbryoPercentage)
        }

        setFilteredBulls(filtered)
    }, [filter, searchTerm, bulls])

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ display: "flex", flexDirection: "column", marginLeft: '40vh', width: '100%' }}>
                    <PageName page="Touros Cadastrados" />
                    <div className={styles.topDiv}>
                        <label htmlFor="filter" style={{ marginRight: '1rem' }}>Filtrar por:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="Todos os touros">Todos os touros</option>
                            <option value="Maior porcentagem de embriões">Maior porcentagem de embriões</option>
                        </select>

                        <label className={styles.label} htmlFor="search">Pesquisar touro:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="search"
                            placeholder="Identificação do touro"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
                        {filteredBulls.map(bull => (
                            <ItemsAnimals key={bull.id} data={{ ...bull, type: "bull" }} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
