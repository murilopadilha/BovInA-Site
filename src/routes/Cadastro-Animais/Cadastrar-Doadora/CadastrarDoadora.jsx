import React, { useState } from "react";
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import SubmitBtn from "../../../Components/SubmitBtn/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from "../../../Components/API/APIip.jsx";

export default function CadastrarDoadora() {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        registrationNumber: '',
        birth: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);
        try {
            const response = await fetch(`http://${IPAdress}/donor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao cadastrar doadora')
            }

            const data = await response.json()
            console.log('Doadora cadastrada com sucesso:', data)
            alert("Doadora cadastrada com sucesso!")

            setFormData({
                name: '',
                breed: '',
                registrationNumber: '',
                birth: ''
            })
            
        } catch (error) {
            console.error('Erro:', error);
            alert("Não foi possível enviar os dados."); 
        }
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ width: '100%', marginLeft: '40vh' }}>
                    <PageName page="Cadastrar Doadora" />
                    <form onSubmit={handleSubmit}>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="name">Nome:</label>
                            <input className={styles.input} type="text" id="name" placeholder="Nome da doadora" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="breed">Raça:</label>
                            <input className={styles.input} type="text" id="breed" placeholder="Raça da doadora" value={formData.breed} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="registrationNumber">Identificação:</label>
                            <input className={styles.input} type="text" id="registrationNumber" placeholder="Identificação da doadora" value={formData.registrationNumber} onChange={handleChange} />
                        </div>
                        <div className={styles.info}>
                            <label className={styles.label} htmlFor="birth">Data de Nascimento:</label>
                            <input className={styles.input} type="date" id="birth" value={formData.birth} onChange={handleChange} />
                        </div>
                        <SubmitBtn action="Doadora" />
                    </form>
                </div>
            </div>
        </div>
    )
}
