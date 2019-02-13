import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container py-2">
            <div className="row">
                <div className="col-md-6 col-centered">
                    <div className="card">
                        <div className="card-header">404: Page Not Found!</div>
                        <div className="card-body">
                            <p>Sorry, this page does not exist!</p>
                            <Link to="/" className="btn btn-block btn-link">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
