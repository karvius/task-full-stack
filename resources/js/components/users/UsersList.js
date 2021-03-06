import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class UsersList extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('api/user').then(response => {
            this.setState({
                users: response.data
            });
        });
    }

    onDeleteClick(user) {
        axios.delete(`api/user/${user.id}`).then(() => {
            axios.get('api/user').then(response => {
                this.setState({
                    users: response.data
                });
            });
        });
    }

    onImportClick() {
        axios.get('api/random').then(() => {
            axios.get('api/user').then(response => {
                this.setState({
                    users: response.data
                });
            });
        });
    }

    render() {
        const { users } = this.state;

        const user = users.map(user => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    <Link
                        className="btn btn-success btn-sm mr-1"
                        to={{ pathname: '/edit', state: { user } }}
                    >
                        Edit
                    </Link>
                    <button
                        onClick={this.onDeleteClick.bind(this, user)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

        return (
            <div className="container py-2">
                <div className="row">
                    <div className="col-auto col-centered">
                        <div className="card">
                            <div className="card-header">
                                <Link
                                    className="btn btn-primary mr-1"
                                    to="/create"
                                >
                                    New User
                                </Link>
                                <button
                                    onClick={this.onImportClick.bind(this)}
                                    className="btn btn-warning"
                                >
                                    Import Random User
                                </button>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table w-auto">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>{user}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersList;
