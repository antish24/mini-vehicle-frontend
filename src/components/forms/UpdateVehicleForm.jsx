import { Button, Form, Select } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import { BACKENDURL } from "../../helper/Urls";

const UpdateVehicleForm = ({ openModalFun, reload,id }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/vehicle/update`, {
        vehicleStatus: values.status,id:id
      });
      reload();
      setLoading(false);
      openModalFun(false);
      openNotification("success", res.data.message, 3, "green");
      form.resetFields();
    } catch (error) {
      setLoading(false);
      openNotification("error", error.response.data.message, 3, "red");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item
          style={{ margin: "5px", width: "100%" }}
          label="Status"
          rules={[
            {
              required: true,
              message: "Please input Status",
            },
          ]}
          name="status"
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'Active',
                label: 'Active',
              },
              {
                value: 'Under Maintenance',
                label: 'Under Maintenance',
              },
              {
                value: 'Retired',
                label: 'Retired',
              },
            ]}
          />
        </Form.Item>
      <Form.Item
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateVehicleForm;
