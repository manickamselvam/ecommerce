import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import { auth, sendSignInLinkToEmailF } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [form] = Form.useForm(); // ✅ Use Ant Design's form instance

  useEffect(() => {
    let locallyStoredEmail = window.localStorage.getItem("emailForSignIn");
    console.log("Get Item=>", locallyStoredEmail);

    if (locallyStoredEmail) {
      setEmail(locallyStoredEmail);
      form.setFieldsValue({ email: locallyStoredEmail }); // ✅ Manually set form value
    }
  }, []); // ✅ Runs only on mount

  const notify = (message) => toast.success(message);

  const onFinish = (values) => {
    console.log("Success:", values);
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    sendSignInLinkToEmailF(auth, values.email, actionCodeSettings)
      .then(() => {
        notify(`Email sent successfully to ${values.email}`);
        window.localStorage.setItem("emailForSignIn", values.email);
      })
      .catch((error) => {
        console.error(
          "send email function error -->",
          error.code,
          error.message
        );
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeEmail = (e) => {
    console.log("OnChange called", e.target.value);
    setEmail(e.target.value);
  };

  return (
    <section className="flex flex-col items-center">
      <div className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-5">
        Register
      </div>
      <div>
        <Form
          form={form} // ✅ Attach form instance
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ email }} // ✅ Optional: Just for first render
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input onChange={onChangeEmail} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
export default Register;
