import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import {
  auth,
  signInWithEmailLinkF,
  isSignInWithEmailLinkF,
  updatePasswordF,
  getIdTokenResultF,
} from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    let locallyStoredEmail = window.localStorage.getItem("emailForSignIn");
    if (locallyStoredEmail) {
      setEmail(locallyStoredEmail);
      form.setFieldsValue({ email: locallyStoredEmail, password: password }); // ✅ Manually set form value
    }
  }, []);

  const onFinish = (values) => {
    setEmail(values.email);
    setPassword(values.password);
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (isSignInWithEmailLinkF(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLinkF(auth, email, window.location.href)
        .then(async (result) => {
          console.log("result=>", result);
          if (result.user.emailVerified) {
            window.localStorage.removeItem("emailForSignIn");
            let user = auth.currentUser;
            console.log("User==>", user);
            console.log("Password =>", password);
            await updatePasswordF(user, password)
              .then((result) => {
                console.log("Password updated sucessfully", result);
              })
              .catch((error) => {
                console.log("Error occured while updating the password");
              });
            const idTokenResult = await user.getIdTokenResult(); // Fetch ID token result
            console.log("Token:", idTokenResult.token);
            // history.push("/");
          }
        })
        .catch((error) => {
          console.log("Error in signInWithEmailLinkF=>", error);
          toast.error("Registration link is expired please try again");
          // history.push("/register");
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeEmail = (e) => {
    console.log("OnChange called", e.target.value);
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    console.log("OnChange called", e.target.value);
    setPassword(e.target.value);
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input onChange={onChangePassword} />
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
export default RegisterComplete;
