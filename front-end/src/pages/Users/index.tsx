import React, { useCallback, useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Header, HeaderContenter, Menu, Container, Content, AreaUsers, HeaderUser, CardUser, BottonsCardUser } from './styles';

import IconButtons from '../../assets/arrow-bt-filtros.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface AllUsers {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<AllUsers[]>([]);
    const { signOut, user } = useAuth();

    const history = useHistory();
    const { addToast } = useToast();

    const callUsers = useCallback(async () =>
    {
        try {
            const session = localStorage.getItem('@Opnet:Token');

            api.defaults.headers.authorization = `Bearer ${session}`;
            const response = await api.get('/users/disapproved');
            const data = response.data;
            setUsers(data?.users);
        } catch (error) {
            history.push('/');

            addToast({
                type: 'error',
                title:'Erro de usuário',
                description: 'Ocorreu um erro ao fazer a listagem de todos os usuário.',
              });

        }
    }, [history, addToast]);

    useEffect(() =>
    {
        callUsers();
    }, [callUsers]);

    const handleAcceptUser = useCallback(async (id) => {
        const data = {
            user_id: id,
            approved: true
        }
        try {
            await api.post('/users/approved', data);

            addToast({
                type: 'success',
                title:'Usuário aceito'
            });

            callUsers();
        } catch (err) {
            addToast({
                type: 'error',
                title:'Erro ao aceitar usuário.'
            });
        }
        
    }, [callUsers, addToast]);

    const handleDisapprovedUser = useCallback(async (id) => {
        const data = {
            id
        }

        try {
            await api.delete('/users/disapproved', { data });

            addToast({
                type: 'success',
                title:'Usuário deletado.'
            });

            callUsers();
        } catch (err) {
            addToast({
                type: 'error',
                title:'Erro ao deletadar usuário.'
            });
        }
        
    }, [callUsers, addToast]);

    return (
        <>
        <Header>
            <HeaderContenter>
                <Menu>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            {user.isAdmin ? 
                                <li>
                                <Link to="/users">
                                    Users
                                </Link>
                            </li>
                            : ''
                            }
                        </ul>
                    </nav>
                </Menu>
                <button type="button" onClick={signOut}>
                    <FiPower />
                </button>
            </HeaderContenter>
        </Header>
        <Container>
            <Content>
                <AreaUsers>
                    <HeaderUser>
                        <div>ID</div>
                        <div>NAME</div>
                        <div>EMAIL</div>
                        <div>USERNAME</div>
                        <div>AÇÕES</div>
                    </HeaderUser>
                    {users.map((row) => (
                        <CardUser key={row.id}>
                            <h1>{row.id}</h1>
                            <div>{row.name}</div>
                            <div>{row.email}</div>
                            <div>{row.username}</div>
                            <BottonsCardUser>
                                <button onClick={() => handleAcceptUser(row.id)}>
                                    <h1>ACEITAR</h1>
                                    <img src={IconButtons} alt="filtros" />
                                </button>
                                <button onClick={() => handleDisapprovedUser(row.id) }>
                                    <h1>DELETAR</h1>
                                    <img src={IconButtons} alt="filtros" />
                                </button>
                            </BottonsCardUser>
                        </CardUser>
                    ))}
                </AreaUsers>
            </Content>
        </Container>
        </>
    );
};

export default Users;