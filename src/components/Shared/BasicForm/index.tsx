import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUserPostData } from 'models';

interface IForm {
  onSubmit: SubmitHandler<IUserPostData>;
  children: React.ReactElement | React.ReactElement[];
}

const BasicForm: React.FC<IForm> = ({ onSubmit, children }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IUserPostData>({
    mode: 'all',
  });

  const registerOptions = {
    fullName: { required: 'Введите имя' },
    email: {
      required: 'Введите адрес email',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Введите корректный адрес email',
      },
    },
    password: {
      required: 'Введите пароль',
      minLength: {
        value: 8,
        message: 'Пароль должен содержать не менее 8 символов',
      },
    },
  };

  const submiForm = async (data: IUserPostData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submiForm)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  key: child.props.name,
                  ...child.props,
                  // @ts-ignore: Unreachable code error
                  ...register(child.props.name, registerOptions[child?.props.name]),
                  // @ts-ignore: Unreachable code error
                  error: Boolean(errors[child.props.name]),
                  // @ts-ignore: Unreachable code error
                  helperText: errors[child.props.name]?.message,
                })
              : child;
          })
        : children}
    </form>
  );
};

export default BasicForm;
