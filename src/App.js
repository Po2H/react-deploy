import React, { useState } from 'react';

function BusinessPrediction() {
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
            const response = await fetch('https://wela-hnplpcqy3-jow12560.vercel.app/git', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ categorical_data: categoricalData, numerical_data: numericalData }),
            });

            const data = await response.json();
            setPrediction(data.prediction);
            setAccuracy(data.accuracy);
            setModalDisplay("block");
        } catch (error) {
            console.error('Error during fetch operation: ', error);
        }
    };

    const closeModal = () => {
        setModalDisplay("none");
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
                    <button id="openModalBtn" type="button" onClick={makePrediction}>
                        Predict
                    </button>
                </form>
            </div>

            <div className="modal" style={{ display: modalDisplay }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Prediction: {prediction}</h2>
                        </div>
                        <div className="modal-body">
                            <p id="modalBodyText">Accuracy: {accuracy}%</p>
                            <a id="exampleLink" href="http://example.com">Go to Example.com</a>
                            <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessPrediction;
