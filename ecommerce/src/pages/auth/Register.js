import { Button, Form, Input } from "antd";
import { useState } from "react";
import { auth, sendSignInLinkToEmailF } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const notify = (message) => toast.success(message);
  const onFinish = (values) => {
    console.log("Success:", values);
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/register/complete",
      // This must be true.
      handleCodeInApp: true,
    };

    sendSignInLinkToEmailF(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        notify(`Email sent sucessfully to ${email}`);
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("send email function error -->", errorCode, errorMessage);
        // ...
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <div className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-5">
          Register
        </div>
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input value={email} onChange={onChangeEmail} />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer></ToastContainer>
      </section>
    </>
  );
};
export default Register;
