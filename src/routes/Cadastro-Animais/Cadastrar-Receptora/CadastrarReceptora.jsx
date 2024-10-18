import React, { useState } from "react";
import Menu from "../../../Components/Menu/index.jsx";
import PageName from "../../../Components/PageName/index.jsx";
import SubmitBtn from "../../../Components/SubmitBtn/index.jsx";
import styles from './styles.module.css';
import { IPAdress } from "../../../Components/API/APIip.jsx";

export default function CadastrarReceptora() {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        registrationNumber: ''
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
            const response = await fetch(`http://${IPAdress}/receiver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao cadastrar receptora')
            }

            const data = await response.json()
            console.log('Receptora cadastrada com sucesso:', data)
            alert("Receptora cadastrada com sucesso!")

            setFormData({
                name: '',
                breed: '',
                registrationNumber: ''
            })

        } catch (error) {
            console.error('Erro:', error);
            alert("Não foi possível enviar os dados para a API.")
        }
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Menu />
                <div style={{ width: '100%', marginLeft: '40vh' }}>
                    <PageName page="Cadastrar Receptora" />
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
