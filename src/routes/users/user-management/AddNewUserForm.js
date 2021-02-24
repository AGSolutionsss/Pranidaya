/**
 * Add New User Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

const type = [
    {
        value: 'donor',
        label: 'donor',
    },
    {
        value: 'viewer',
        label: 'viewer',
    },
];
const acctype = [
    {
        value: 'admin',
        label: 'admin',
    },
    {
        value: 'superadmin',
        label: 'superadmin',
    },
    {
        value: 'user',
        label: 'user',
    },
];
const AddNewUserForm = ({ addNewUserDetails, onChangeAddNewUserDetails }) => (
    <Form>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter Person Name"
                value={addNewUserDetails.name}
                onChange={(e) => onChangeAddNewUserDetails('name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userName">Name</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                required
                placeholder="Enter Username"
                value={addNewUserDetails.name}
                onChange={(e) => onChangeAddNewUserDetails('username', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                required
                placeholder="Enter Email"
                value={addNewUserDetails.emailAddress}
                onChange={(e) => onChangeAddNewUserDetails('emailAddress', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="Phone">Phone Number</Label>
            <Input
                type="number"
                name="phone"
                id="phone"
                maxLength={10}
                placeholder="Enter Phone Number"
                value={addNewUserDetails.Phone}
                onChange={(e) => onChangeAddNewUserDetails('phone', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
           
            <TextField id="select-corrpreffer" select label="Type"
                SelectProps={{
                    MenuProps: {
                    },
                }}
                required
                type="text"
                name="userType"
                id="userType"
                value={addNewUserDetails.type}
                onChange={(e) => onChangeAddNewUserDetails('type', e.target.value)}

                fullWidth>
                {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormGroup>
        <FormGroup>
           
             <TextField id="select-corrpreffer" select label="Account Type"
                SelectProps={{
                    MenuProps: {
                    },
                }}
                required
                type="text"
                name="accountType"
                id="accountType"
                value={addNewUserDetails.accountType}
                onChange={(e) => onChangeAddNewUserDetails('accounttype', e.target.value)}

                fullWidth>
                {acctype.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormGroup>
    </Form>
);

export default AddNewUserForm;
