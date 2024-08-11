import React, { useContext } from 'react';
import { Form, Input, Modal, notification } from 'antd';

import { UserContext } from '../../helpers';
import { useLoginMutation } from '../../queries';
import { emailValidation, requiredStringValidation } from '../../helpers/validation';
import Button from '../shared/Button';

interface LoginParams {
  validationFailed: (errors) => void;
  forgotPassword: () => void;
}

export default function Login({ validationFailed, forgotPassword }: LoginParams) {
  const { setUser } = useContext(UserContext);

  const [form] = Form.useForm();

  const loginMutation = useLoginMutation({
    onError(message) {
      if (message.startsWith('403')) {
        Modal.warning({
          content: 'You do not have access to this application, please contact your administrator!',
          okType: 'default',
          okText: 'Close',
        });
      } else {
        notification.warning({
          message: 'Login failed',
          description: message,
          key: '0',
        });
      }
    },
    onSuccess(data) {
      setUser(data);

      form.setFieldsValue({
        email: undefined,
        password: undefined,
      });
    },
  });

  const submit = (values) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div>
      <p className="text-xl text-slate-400 text-center">Enter your email and password below</p>

      <Form
        form={form}
        name="login"
        layout="vertical"
        className="mt-s-4"
        onFinish={submit}
        onFinishFailed={validationFailed}
      >
        <Form.Item label="Email" name="email" rules={[...requiredStringValidation(), ...emailValidation()]}>
          <Input placeholder="email..." size="large" autoComplete="email" inputMode="email" />
        </Form.Item>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              forgotPassword();
              form.setFieldValue('password', undefined);
            }}
            className="absolute right-0 -top-0.5 mt-0.5 text-gray-500 hover:text-brand-orange z-[1]"
          >
            Forgot password?
          </button>

          <Form.Item label="Password" name="password" rules={[...requiredStringValidation()]} className="relative">
            <Input.Password placeholder="password..." size="large" autoComplete="current-password" inputMode="text" />
          </Form.Item>
        </div>

        <div className="my-s-6">
          <Button size="medium" block loading={loginMutation.isLoading} type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
