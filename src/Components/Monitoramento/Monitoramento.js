import React, { useState } from 'react';
import styles from './Monitoramento.module.css';
import AppRoutes from '../../routes';


function WaterCounter() {
  const [waterCount, setWaterCount] = useState(0);
  const [weight, setWeight] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterLog, setWaterLog] = useState([]);

  const handleIncrement = () => {
    setWaterCount(waterCount + 500);
    setWaterLog([...waterLog, 500]);
  };

  const handleDecrement = () => {
    if (waterCount > 0) {
      setWaterCount(waterCount - 500);
      setWaterLog([...waterLog, -500]);
    }
  };

  const handleClearAll = () => {
    setWaterCount(0); // Zera a contagem de mililitros
    setWaterLog([]); // Limpa o registro de consumo
  };

  const handleClearLog = () => {
    setWaterLog([]);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateWaterIntake = () => {
    const intake = weight * 30;
    setWaterIntake(intake);
  };

  const isDailyIntakeMet = waterCount >= waterIntake;

  return (
    <div className={styles.main}>  
      <div className={styles.App2}>
        <div className={styles.register_water}>
          <h3>Registro de Consumo de Água</h3>
          <ul className={styles.water_log}>
            {waterLog.slice(-20).map((amount, index) => (
              <li key={index}>{amount > 0 ? `+${amount}` : amount}ml</li>
            ))}
          </ul>
          <button className={styles.button_registro_clear} onClick={handleClearLog}>Limpar Registro</button>
        </div>
        

        <div className={styles.contador_agua}>
          <p className={styles.quantidade_water}><span className={styles.span2}>{waterCount}ml</span>/{waterIntake}ml</p>
          {isDailyIntakeMet ? (
            <p className={styles.congratulation} style={{ color: 'green' }}>Parabéns! Você atingiu a quantidade diária recomendada de água.</p>
          ) : (
            <p style={{ color: 'red' }}>Você ainda precisa beber mais água para atingir a meta diária.</p>
          )}
          
          <button id="button-water-all" className={styles.button_water} onClick={handleIncrement}>Beber 1 copo</button>
          <button id="button-water-all" className={styles.button_water} onClick={handleDecrement}>Remover 1 copo</button>
          <button id="button-water-all" className={styles.button_water} onClick={handleClearAll}>Zerar Tudo</button>
        </div>

        <div className={styles.calculator_water}>
          <h2>Calculadora de Consumo de Água</h2>
          <input className={styles.calculadora} type="number"  onChange={handleWeightChange} placeholder="Insira seu peso em kg" />
          <button className={styles.button_calculator} onClick={calculateWaterIntake}>Calcular</button>
          <p>Você deve consumir aproximadamente: <span className={styles.span} style={{ color: 'black' }}>{waterIntake} ml de água por dia.</span></p>
        </div>

      </div>
    </div>  
  );
}

function App() {
  return (
    <>
      <WaterCounter />
    </>
    
  );
}

export default App;

