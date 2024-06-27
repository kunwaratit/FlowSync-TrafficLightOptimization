import React, { useState } from "react"
const District =()=>{
    const [provincesData] = useState([
        {
          "province": "Province No. 1",
          "districts": [
            "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang",
            "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha",
            "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"
          ]
        },
        {
          "province": "Province No. 2",
          "districts": ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"]
        },
        {
          "province": "Bagmati Province",
          "districts": ["Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kavrepalanchok", "Kathmandu", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"]
        },
        {
          "province": "Gandaki Province",
          "districts": ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"]
        },
        {
          "province": "Lumbini Province",
          "districts": ["Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu", "Parasi (Nawalparasi West)", "Palpa", "Pyuthan", "Rolpa", "Rukum (East)", "Rupandehi"]
        },
        {
          "province": "Karnali Province",
          "districts": ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Rukum (West)", "Salyan", "Surkhet"]
        },
        {
          "province": "Sudurpashchim Province",
          "districts": ["Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]
        }
      ]);
    
      // State to track selected province
      const [selectedProvince, setSelectedProvince] = useState(null);
    
      // Function to handle province click
      const handleProvinceClick = (province) => {
        setSelectedProvince(province);
      };
    
      return (
        <div>
          <h2>Provinces and Districts</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* List of provinces */}
            <div style={{ width: '30%', paddingRight: '20px' }}>
              <h3>Provinces</h3>
              <ul>
                {provincesData.map((province, index) => (
                  <li key={index} style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => handleProvinceClick(province)}>
                    {province.province}
                  </li>
                ))}
              </ul>
            </div>
            {/* Display districts for selected province */}
            <div style={{ width: '70%' }}>
              <h3>Districts</h3>
              {selectedProvince && (
                <ul>
                  {selectedProvince.districts.map((district, index) => (
                    <li key={index}>{district}</li>
                  ))}
                </ul>
              )}
              {!selectedProvince && <p>Select a province to view its districts.</p>}
            </div>
          </div>
        </div>
      );
    
    
}
export default District;