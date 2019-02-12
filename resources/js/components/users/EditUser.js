import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class EditUser extends Component {
    constructor(props) {
        super(props);
        const { user } = props.location.state;

        this.state = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUserEdit = this.handleUserEdit.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUserEdit(event) {
        event.preventDefault();

        const { history } = this.props;
        const { id } = this.props.location.state.user;

        const user = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        };

        axios
            .patch(`/api/user/${id}`, user)
            .then(response => {
                history.push('/');
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        return (
            <div className="container py-2">
                <div className="row">
                    <div className="col-md-6 col-centered">
                        <div className="card">
                            <div className="card-header">Edit User</div>
                            <div className="card-body">
                                <form onSubmit={this.handleUserEdit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor('name')
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor('email')
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('email')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            id="phone"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor('phone')
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('phone')}
                                    </div>
                                    <button className="btn btn-primary">
                                        Save Changes
                                    </button>
                                    <Link className="btn btn-link" to="/">
                                        Back
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;
