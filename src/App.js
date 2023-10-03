import React, { useState } from 'react';
import './App.css'; // Assuming you will store your CSS in App.css

function App() {
    const [modalDisplay, setModalDisplay] = useState("none");
    const [categoricalData, setCategoricalData] = useState("");
    const [numericalData, setNumericalData] = useState("");
    const [prediction, setPrediction] = useState("");
    const [accuracy, setAccuracy] = useState("");

    const options = [
      'โรงแรม รีสอร์ทและห้องชุด', 'เกสต์เฮ้าส์', 'ที่พักสัมผัสวัฒนธรรมชนบท', 
      'กิจกรรมที่พักแรมระยะสั้นอื่น ๆ ซึ่งมิได้จัดประเภทไว้ในที่อื่น', 
      'ลานตั้งค่ายพักแรม ที่จอดรถพ่วงและที่ตั้งที่พักแบบเคลื่อนที่', 
      'การบริการห้องพักหรือที่พักอาศัยสำหรับนักเรียน/นักศึกษา', 
      'การบริการที่พักแรมประเภทอื่นๆซึ่งมิได้จัดประเภทไว้ในที่อื่น', 
      'การบริการด้านอาหารในภัตตาคาร/ร้านอาหาร', 'การบริการด้านอาหารบนแผงลอยและตลาด', 
      'การบริการด้านอาหารโดยร้านอาหารแบบเคลื่อนที่', 'การบริการด้านการจัดเลี้ยง', 
      'การบริการอาหารสำหรับกิจการขนส่ง', 'การดำเนินงานของโรงอาหาร', 
      'การบริการด้านอาหารอื่นๆซึ่งมิได้จัดประเภทไว้ในที่อื่น', 
      'การบริการด้านเครื่องดื่มที่มีแอลกอฮอล์เป็นหลักในร้าน', 
      'การบริการด้านเครื่องดื่มที่ไม่มีแอลกอฮอล์เป็นหลักในร้าน', 
      'การบริการด้านเครื่องดื่มบนแผงลอยและตลาด', 'การบริการด้านเครื่องดื่มโดยร้านเคลื่อนที่'
    ];

    const makePrediction = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ categoricalData, numericalData }),
            });

            const data = await response.json();
            setPrediction(data.prediction);
            setAccuracy(data.accuracy);
            setModalDisplay("block");
        } catch (error) {
            console.error('Error during fetch operation: ', error);
        }
    };

    return (
        <div>
            <header>Business prediction</header>
            <div className="container">
                <form id="predictForm">
                    <label htmlFor="categorical_data">Business type:</label>
                    <select
                        id="categorical_data"
                        className="input-field"
                        name="categorical_data"
                        required
                        value={categoricalData}
                        onChange={(e) => setCategoricalData(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <br /><br />

                    <label htmlFor="numerical_data">Numerical Data:</label>
                    <input
                        type="number"
                        id="numerical_data"
                        name="profitmargin"
                        required
                        value={numericalData}
                        onChange={(e) => setNumericalData(e.target.value)}
                    />
                    <br /><br />
                    <button type="button" onClick={makePrediction}>
                        Predict
                    </button>
                </form>
            </div>

            {/* Modal Component can go here, or you can create a separate component file for it */}
        </div>
    );
}

export default App;
