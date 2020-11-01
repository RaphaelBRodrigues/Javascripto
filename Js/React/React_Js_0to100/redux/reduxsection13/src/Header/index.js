import React from 'react';
import * as S from './styled';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default () => {
    const teste = useSelector((state) => state);
    console.log(teste);
    return (
        <S.Header>
            <S.Nav>
                <S.Navlist>
                    <S.NavItem>
                        <S.Title>    
                            <Link to="/">
                                Redux
                            </Link>
                        </S.Title>
                    </S.NavItem>
                </S.Navlist>
                <S.Navlist>
                    <S.NavItem>
                        <Link to="reservas">
                           Minhas Reservas 
                        </Link>
                    </S.NavItem>
                    <S.NavItem>
                        <Link to="reservas">
                           0 reservas
                        </Link>
                    </S.NavItem>
                </S.Navlist>
            </S.Nav>
        </S.Header>
    );

}