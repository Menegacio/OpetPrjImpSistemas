import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiLock, FiMail, FiUserPlus } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    username: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const hundleSubmit = useCallback( async (data: SignUpFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório.'),
                email: Yup.string().required('E-mail obrigatório.').email('Digite um e-mail valido.'),
                username: Yup.string().required('Username obrigatório.'),
                password: Yup.string().min(6, 'Senha no mínimo 6 digitos.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado.',
                description: 'Você já pode fazer seu login!'
            })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro.',
                description: 'Ocorreu um erro ao fazer o seu cadastro, tente novamente.',
            });
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={hundleSubmit}>
                        <h1>Faca seu cadastro</h1>

                        <Input name='name'  icon={FiUser} placeholder='Nome' />
                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                        <Input name='username' icon={FiUserPlus} placeholder='Username' />
                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />

                        <Button type='submit'>Cadastrar</Button>
                    </Form>

                    <Link to='/'>
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
}

export default SignUp;