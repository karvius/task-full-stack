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
        console.log(user);
    }

    onEditClick(user) {
        console.log(user);
    }

    render() {
        const { users } = this.state;

        const user = users.map(user => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    <button
                        onClick={this.onEditClick.bind(this, user)}
                        className="btn btn-success btn-sm"
                    >
                        Edit
                    </button>
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
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <Link className="btn btn-primary" to="/create">
                                    New User
                                </Link>
                            </div>
                            <div className="card-body">
                                <table className="table">
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
