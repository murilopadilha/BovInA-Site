import React, { useState, useEffect } from "react";
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import SubmitBtn from "../../../Components/SubmitBtn/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from "../../../Components/API/APIip.jsx";
import { useLocation } from 'react-router-dom';

export default function EditarReceptora() {
    const location = useLocation()
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        registrationNumber: ''
    })

    useEffect(() => {
        const { id } = location.state || {}
        if (id) {
            fetchReceiverData(id)
        }
    }, [location])

    const fetchReceiverData = async (id) => {
        try {
            const response = await fetch(`http://${IPAdress}/receiver/${id}`)
            const data = await response.json()
            setFormData(data)
        } catch (error) {
            console.error('Erro ao buscar receptora:', error)
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
            const response = await fetch(`http://${IPAdress}/receiver/${location.state.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar doadora')
            }

            const data = await response.json()
            console.log('Receptora atualizada com sucesso:', data)
            alert("Receptora atualizada com sucesso!")
            setFormData({
                name: '',
                breed: '',
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
                    <PageName page="Editar Receptora" />
                    <form onSubmit={handleSubmit}>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="name">Nome:</label>
                            <input className={styles.input} type="text" id="name" placeholder="Nome da receptora" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="breed">Raça:</label>
                            <input className={styles.input} type="text" id="breed" placeholder="Raça da receptora" value={formData.breed} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="registrationNumber">Identificação:</label>
                            <input className={styles.input} type="text" id="registrationNumber" placeholder="Identificação da receptora" value={formData.registrationNumber} onChange={handleChange} />
                        </div>
                        <SubmitBtn action="Receptora" /> 
                    </form>
                </div>
            </div>
        </div>
    )
}
