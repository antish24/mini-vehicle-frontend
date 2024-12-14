import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { AlertContext } from "../../context/AlertContext";
import { BACKENDURL } from "../../helper/Urls";

const NewVehicleForm = ({ openModalFun, reload }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/vehicle/add`, {
        name: values.name,
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
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input Name",
            },
          ]}
          name="name"
        >
          <Input />
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewVehicleForm;
