import React, { useState } from "react";
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import SubmitBtn from "../../../Components/SubmitBtn/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from "../../../Components/API/APIip.jsx";

export default function NovaFiv() {
    const [formData, setFormData] = useState({
        date: '',
        farm: '',
        laboratory: '',
        client: '',
        veterinarian: '',
        technical: '',
        TE: ''
    })

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
            const response = await fetch(`http://${IPAdress}/fiv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao cadastrar nova FIV')
            }

            const data = await response.json();
            console.log('Nova FIV cadastrada com sucesso:', data)
            alert("Nova FIV cadastrada com sucesso!")

            setFormData({
                date: '',
                farm: '',
                laboratory: '',
                client: '',
                veterinarian: '',
                technical: '',
                TE: ''
            })
            
        } catch (error) {
            console.error('Erro:', error);
            alert("Não foi possível enviar os dados.")
        }
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ width: '100%', marginLeft: '40vh' }}>
                    <PageName page="Cadastrar Nova FIV" />
                    <form onSubmit={handleSubmit}>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="date">Data da Coleta:</label>
                            <input 
                                className={styles.input} 
                                type="date" 
                                id="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="farm">Fazenda:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="farm" 
                                placeholder="Nome da fazenda" 
                                value={formData.farm} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="client">Cliente:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="client" 
                                placeholder="Nome do cliente" 
                                value={formData.client} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="laboratory">Laboratório:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="laboratory" 
                                placeholder="Nome do laboratório" 
                                value={formData.laboratory} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="veterinarian">Veterinário:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="veterinarian" 
                                placeholder="Nome do veterinário" 
                                value={formData.veterinarian} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="technical">Técnico:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="technical" 
                                placeholder="Nome do técnico" 
                                value={formData.technical} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="TE">TE:</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="TE" 
                                placeholder="Nome do TE" 
                                value={formData.TE} 
                                onChange={handleChange} 
                            />
                        </div>
                        <SubmitBtn action="Nova FIV" />
                    </form>
                </div>
            </div>
        </div>
    )
}
