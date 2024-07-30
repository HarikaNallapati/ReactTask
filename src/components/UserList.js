import { DataTable, Button } from "pepsico-ds";
import React, { useState } from 'react';
import Modal from "./Modal";
import '../App.css';

function UserList({props, handleBack, handleEdit, handleDelete}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteUsername, setDeleteUsername] = useState('');
    const records = props;

    const maskPassword = (password) => {
        return '*'.repeat(password.length);
    };

    const openModal = (id, username) => {
        setDeleteId(id);
        setDeleteUsername(username);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteId(null);
        setDeleteUsername('');
    };

    const confirmDelete = () => {
        handleDelete(deleteId);
        closeModal();
    };


    return(
        <> 
        <Button
                        size="small"
                        text="Back"
                        variant="primary"
                        className="button"
                        onClick={handleBack}
        />
        <DataTable
                columns={[
                    { columnKey: 'username', header: 'UserName' },
                    { columnKey: 'email', header: 'Email' },
                    { columnKey: 'password', header: 'Password' },
                    { columnKey: 'gender', header: 'Gender' },
                    { columnKey: 'age', header: 'Age' },
                    { columnKey: 'skills', header: 'Skills' },
                    { columnKey: 'remembertheinfo', header: 'RememberTheInfo' },
                    { columnKey: 'action', header: 'Actions' },
                ]}
                data={records.map(record => ({
                    username: record.username,
                    email: record.email,
                    password: maskPassword(record.password),
                    gender: record.gender,
                    age: record.age,
                    skills: record.skills,
                    remembertheinfo: record.remembertheinfo ? 'True' : 'False',
                    action: (
                        <>
                            <Button
                                size="small"
                                text="Edit"
                                variant="secondary"
                                className="button"
                                onClick={() => handleEdit(record.id)}
                            />
                             <Button
                                size="small"
                                text="Delete"
                                variant="secondary"
                                className="button"
                                onClick={() => openModal(record.id, record.username)}
                            />
                        </>
                    )

                }))}
                headerAction={{
                    iconTrailing: 'arrow_forward',
                    onClick: () => { },
                    size: 'small',
                    text: 'Button',
                    variant: 'primary'
                }}
                pageIndex={0}
                pageSize={10}
                renderSubComponent={() => {}}
                selection="single"
                size="large"
            />
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete user ${deleteUsername}?`}
            />
        </>

    );
    
}
export default UserList;