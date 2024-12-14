import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { AlertContext } from '../context/AlertContext';
import { BACKENDURL } from '../helper/Urls';
import ModalForm from '../modal/Modal';
import VehicleTable from '../components/tables/VehicleTable';
import NewVehicleForm from '../components/forms/NewVehicleForm';

const VehiclePage = () => {
  const {openNotification} = useContext(AlertContext);

  const [VehicleData,setVehicleData]=useState([])
  const [loading,setLoading]=useState(false)

  const getVehicleData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/vehicle/all`);
      setLoading (false);
      setVehicleData(res.data.vehicles)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getVehicleData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Add New Vehicle
        </Button>
        <Button type='default' onClick={getVehicleData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Vehicle Form'}
          content={<NewVehicleForm reload={()=>getVehicleData()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <VehicleTable loading={loading} reload={()=>getVehicleData()} VehicleData={VehicleData}/>
    </div>
  )
}

export default VehiclePage