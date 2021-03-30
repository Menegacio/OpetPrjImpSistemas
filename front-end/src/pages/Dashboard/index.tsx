import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContenter, Profile } from './styles';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    return (
        <Container>
            <Header>
                <HeaderContenter>

                    <Profile>
                        <div>
                            <span>Bem-vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContenter>
            </Header>
        </Container>
    );
};

export default Dashboard;