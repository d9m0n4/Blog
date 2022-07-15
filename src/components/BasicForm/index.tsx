import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { IUserPostData } from 'types';

interface IForm {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactElement | React.ReactElement[];
}

const BasicForm: React.FC<IForm> = ({ onSubmit, children }) => {
  const {
    handleSubmit,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
