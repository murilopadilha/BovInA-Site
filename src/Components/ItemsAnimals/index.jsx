import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import styles from './styles.module.css';

export default function ItemsAnimals({ data, onDelete }) { 
    const [showIcons, setShowIcons] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    const toggleIcons = () => {
        setShowIcons(!showIcons)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100)

        return () => clearTimeout(timer);
    }, [])

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir ${data.name}?`)
        if (confirmDelete) {
            try {
                const response = await fetch(`http://18.188.243.197:8080/${data.type}/${data.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    onDelete(data.id);
                } else {
                    console.error("Erro ao excluir o animal:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao excluir o animal:", error);
            }
        }
    }

    const handleEdit = () => {
        const editPath = data.type === 'receiver' 
            ? `/EditarReceptora` 
            : data.type === 'donor' 
            ? `/EditarDoadora` 
            : `/EditarTouro`

        navigate(editPath, { state: { id: data.id } })
    }

    return (
        <div className={`${styles.container} ${isVisible ? styles.visible : ''}`} onClick={toggleIcons}>
            <div className={styles.itemInfo}>
                <span className={styles.label}><strong>Nome:</strong></span>
                <span className={styles.value}>{data.name}</span>
            </div>
            <div className={styles.itemInfo}>
                <span className={styles.label}><strong>Identificação:</strong></span>
                <span className={styles.value}>{data.registrationNumber}</span>
            </div>

            {data.breed && (
                <div className={styles.itemInfo}>
                    <span className={styles.label}><strong>Raça:</strong></span>
                    <span className={styles.value}>{data.breed}</span>
                </div>
            )}

            {data.averageViableOocytes && (
                <div className={styles.itemInfo}>
                    <span className={styles.label}><strong>Média de Oócitos Viáveis:</strong></span>
                    <span className={styles.value}>{data.averageViableOocytes}</span>
                </div>
            )}

            {data.pregnancy && (
                <>
                    <div className={styles.itemInfo}>
                        <span className={styles.label}><strong>Status da Gestação:</strong></span>
                        <span className={styles.value}>{data.pregnancy.status}</span>
                    </div>
                    <div className={styles.itemInfo}>
                        <span className={styles.label}><strong>Idade Gestacional:</strong></span>
                        <span className={styles.value}>{data.pregnancy.gestationalAge} dias</span>
                    </div>
                    <div className={styles.itemInfo}>
                        <span className={styles.label}><strong>Dia da Transferência:</strong></span>
                        <span className={styles.value}>{data.pregnancy.transferDay}</span>
                    </div>
                </>
            )}

            {data.averageEmbryoPercentage && (
                <div className={styles.itemInfo}>
                    <span className={styles.label}><strong>Porcentagem de Embriões:</strong></span>
                    <span className={styles.value}>{data.averageEmbryoPercentage}</span>
                </div>
            )}

            {showIcons && (
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon={faEdit} className={styles.icon} onClick={handleEdit} /> 
                    <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={handleDelete} />
                </div>
            )}
        </div>
    )
}
