import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

export default function SubmitBtn({ action, link, object }) {
    return (
        <button type="submit" className={styles.button}>
            <FontAwesomeIcon icon={faCheck} className={styles.icon} /> 
            Salvar
        </button>
    )
}
