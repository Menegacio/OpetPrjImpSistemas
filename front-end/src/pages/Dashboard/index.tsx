import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContenter, Menu } from './styles';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    return (
        <Container>
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
        </Container>
    );
};

export default Dashboard;