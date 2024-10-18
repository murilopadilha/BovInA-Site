import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import axios from 'axios';
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import styles from './styles.module.css';

export default function FIV() {
    const location = useLocation();
    const fivId = location.state?.id;
    
    const [fivData, setFivData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showExtraButtons, setShowExtraButtons] = useState(false);
    const [rotate, setRotate] = useState(false);

    useEffect(() => {
        if (fivId) {
            fetchFivData(fivId);
        }
    }, [fivId]);

    const fetchFivData = async (id) => {
        try {
            const response = await axios.get(`http://18.188.243.197:8080/fiv/${id}`);
            setFivData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados da FIV:', error);
            setLoading(false);
        }
    };

    const handleFloatingButtonClick = () => {
        setRotate(!rotate);
        setShowExtraButtons(!showExtraButtons);
    };

    if (loading) {
        return <p className={styles.loading}>Carregando dados...</p>;
    }

    if (!fivData) {
        return <p className={styles.error}>Dados não encontrados</p>;
    }

    return (
        <div className={styles.app}>
            <div className={styles.pageWrapper}>
                <Menu />
                <div className={styles.content}>
                    <PageName page="Detalhes da FIV" />
                    
                    {/* Cabeçalho com as informações principais */}
                    <div className={styles.contentInfo}>
                        <div className={styles.header}>
                            <h3>Informações da FIV</h3> 
                            <div className={styles.infoBox}>
                                <p><strong>ID:</strong> {fivData.id}</p>
                                <p><strong>Data:</strong> {fivData.date}</p>
                                <p><strong>Fazenda:</strong> {fivData.farm}</p>
                                <p><strong>Cliente:</strong> {fivData.client}</p>
                                <p><strong>Laboratório:</strong> {fivData.laboratory}</p>
                                <p><strong>Veterinário:</strong> {fivData.veterinarian}</p>
                                <p><strong>Técnico:</strong> {fivData.technical}</p>
                                <p><strong>TE:</strong> {fivData.TE}</p>
                            </div>
                        </div>

                        {/* Coleta de Oócitos */}
                        <div className={styles.details}>
                            <h3>Coleta de Oócitos</h3>
                            <div className={styles.dataBox}>
                                <p><strong>Total de Oócitos Coletados:</strong> {fivData.fivTotalOocytesCollected}</p>
                                <p><strong>Total de Oócitos Viáveis:</strong> {fivData.fivTotalViableOocytesCollected}</p>
                            </div>

                            {/* Produção de Embriões */}
                            <h3>Produção de Embriões</h3>
                            <div className={styles.dataBox}>
                                <p><strong>Total de Embriões:</strong> {fivData.fivTotalEmbryos}</p>
                                <p><strong>Porcentagem de Embriões:</strong> {fivData.fivEmbryosPercentage}</p>
                                <p><strong>Embriões Registrados:</strong> {fivData.embryosRegistered}</p>
                            </div>
                        </div>
                        
                        {/* Tabela de Doadoras e Touros */}
                        <h3>Coletas Realizadas</h3>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Doadora</th>
                                    <th>Touro</th>
                                    <th>Total</th>
                                    <th>Viáveis</th>
                                    <th>Emb%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fivData.oocyteCollections && fivData.oocyteCollections.length > 0 ? (
                                    fivData.oocyteCollections.map((collection, index) => (
                                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#E0E0E0' }}>
                                            <td>{index + 1}</td>
                                            <td>{`${collection.donorCattle.name} (${collection.donorCattle.id})`}</td>
                                            <td>{`${collection.bull.name} (${collection.bull.id})`}</td>
                                            <td>{collection.totalOocytes}</td>
                                            <td>{collection.viableOocytes}</td>
                                            <td>{collection.embryoProduction.embryosPercentage}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum dado disponível</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Botão flutuante */}
                    <div className={styles.floatingButtonContainer}>
                        <button
                            className={`${styles.floatingButton} ${rotate ? styles.rotate : ''}`}
                            onClick={handleFloatingButtonClick}
                        >
                            {showExtraButtons ? '▼' : '+'}
                        </button>
                        {showExtraButtons && (
                            <div className={styles.extraButtons}>
                                <button className={styles.extraButton}>Embriões</button>
                                <button className={styles.extraButton}>Prenhez</button>
                                <button className={styles.extraButton}>Registrar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
