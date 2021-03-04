import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixe='top'>
            <Container>
                <Menu.Item header>
                    Movies
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Add Movie' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}