import React, { useState } from 'react';
import styles from './styles.module.css';
import logoBranca from '../../images/logo-branca.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faList, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    const [showOptions, setShowOptions] = useState(false)
    const [showAnimals, setShowAnimals] = useState(false)

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }

    const toggleAnimals = () => {
        setShowAnimals(!showAnimals)
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <img className={styles.img} src={logoBranca} alt="BovInA" />
                    <h3 style={{color: "#fff"}}>BovInA</h3>
                </div>
            </div>
            <div className={styles.optionsContent}>
                <ul className={styles.list}>
                <li className={styles.listItems}>
                    <Link className={styles.link} to="/">
                        <FontAwesomeIcon icon={faHome} className={styles.icon} />
                        Home
                    </Link>
                </li>
                <li className={styles.listItems} onClick={toggleOptions}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                    Cadastrar Animais
                </li>
                {showOptions && (
                    <ul className={styles.subList}>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/CadastrarDoadora">Cadastrar Doadora</Link>
                        </li>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/CadastrarReceptora">Cadastrar Receptora</Link>
                        </li>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/CadastrarTouro">Cadastrar Touro</Link>
                        </li>
                    </ul>
                )}
                <li className={styles.listItems} onClick={toggleAnimals}>
                    <FontAwesomeIcon icon={faList} className={styles.icon} />
                    Animais Cadastrados
                </li>
                {showAnimals && (
                    <ul className={styles.subList}>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/DoadorasCadastradas">Doadoras Cadastradas</Link>
                        </li>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/ReceptorasCadastradas">Receptoras Cadastradas</Link>
                        </li>
                        <li className={styles.subListItems}>
                            <Link className={styles.link} to="/TourosCadastrados">Touros Cadastrados</Link>
                        </li>
                    </ul>
                )}
                <li className={styles.listItems}>
                    <Link className={styles.link} to="/PIVE">
                        <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
                        PIVE
                    </Link>
                </li>
                </ul>
            </div>
        </div>
    )
}
