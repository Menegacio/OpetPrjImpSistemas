import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isField: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: #F0F0F5;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    border: 2px solid ${shade(0.1, '#F0F0F5')};
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${ props => props.isErrored  && css`
        border-color: #FDFDFD;
    `}

    ${ props => props.isFocused  && css`
        color: #ea0404;
        border-color: #ea0404;
    `}

    ${ props => props.isField  && css`
        color: #ea0404;
    `}

    input {
        background: transparent;
        flex: 1;
        border: 0;
        color: #ea0404;

        &::placeholder {
            color: #ea0404;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;