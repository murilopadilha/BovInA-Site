import Menu from "../../Components/Menu/index.jsx";
import PageName from "../../Components/PageName/index.jsx";
import logo from "../../images/logo.png"
import styles from './styles.module.css';

export default function App() {
  return (
    <div className="app">
      <div style={{display: 'flex', flexDirection: "row"}}>
        <Menu />
        <div style={{display: "flex", flexDirection: "column", marginLeft: '40vh', width: '100%'}}>
          <PageName page="Home"/>
          <div className={styles.content}>
            <div className={styles.leftContent}>
              <h3 className={styles.title}>BovInA</h3>
              <img className={styles.image} src={logo} alt="BovInA" />
            </div>
            <div className={styles.rightContent}>
              <h2 className={styles.rightText}>Bovine In Vitro Application</h2>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}