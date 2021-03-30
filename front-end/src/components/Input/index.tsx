import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setFocused] = useState(false);
    const [isField, setIsField] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputFocused = useCallback(() => {
        setFocused(true)
    }, []);

    const handleInputBlur = useCallback(() => {
        setFocused(false);
        setIsField(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isField={isField} isFocused={isFocused} >
            { Icon && <Icon size={20} />}
            <input defaultValue={defaultValue} 
            ref={inputRef} {...rest}
            onFocus={handleInputFocused} 
            onBlur={handleInputBlur} />

            {error && (
                <Error title={error} >
                    <FiAlertCircle color='#c53030' size={20} />
                </Error>
            )}
        </Container>
    );
};

export default Input;