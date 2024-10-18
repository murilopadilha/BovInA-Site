import React, { useState, useEffect } from "react";
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import SubmitBtn from "../../../Components/SubmitBtn/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from "../../../Components/API/APIip.jsx";
import { useLocation } from 'react-router-dom';

export default function EditarTouro() {
    const location = useLocation()
    const [formData, setFormData] = useState({
        name: '',
        registrationNumber: ''
    })

    useEffect(() => {
        const { id } = location.state || {}
        if (id) {
            fetchBullData(id)
        }
    }, [location])

    const fetchBullData = async (id) => {
        try {
            const response = await fetch(`http://${IPAdress}/bull/${id}`)
            const data = await response.json()
            setFormData(data)
        } catch (error) {
            console.error('Erro ao buscar touro:', error)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Dados enviados:", formData)
        try {
            const response = await fetch(`http://${IPAdress}/bull/${location.state.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar touro')
            }

            const data = await response.json()
            console.log('Touro atualizado com sucesso:', data)
            alert("Touro atualizado com sucesso!")
            setFormData({
                name: '',
                registrationNumber: ''
            })
        } catch (error) {
            console.error('Erro:', error)
            alert("Não foi possível enviar os dados.")
        }
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ width: '100%', marginLeft: '40vh' }}>
                    <PageName page="Editar Touro" />
                    <form onSubmit={handleSubmit}>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="name">Nome:</label>
                            <input className={styles.input} type="text" id="name" placeholder="Nome do touro" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="registrationNumber">Identificação:</label>
                            <input className={styles.input} type="text" id="registrationNumber" placeholder="Identificação do touro" value={formData.registrationNumber} onChange={handleChange} />
                        </div>
                        <SubmitBtn action="Touro" /> 
                    </form>
                </div>
            </div>
        </div>
    )
}
