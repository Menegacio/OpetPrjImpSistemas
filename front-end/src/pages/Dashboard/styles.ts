import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
    padding: 32px 0;
    background: ${shade(0.1, '#FFFFFF')};

    ul {
        display: flex;

        li {
            list-style: none;

            a {
                color: #ea0404;
                font-family: sans-serif;
                margin-right: 1rem;
                text-decoration: none;
                transition: opacity 0.2s;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
`;

export const HeaderContenter = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
            color: #ea0404;
            width: 20px;
            height: 20px;
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: ${shade(0.1, '#ea0404')};
        }

        strong {
            color: #ea0404;
        }
    }
`;