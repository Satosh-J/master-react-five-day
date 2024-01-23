import { Link, useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-danger" role="alert">
                        <h1>
                            Oops!
                        </h1>
                        <h5>
                            Sorry, an error has occured
                        </h5>
                        <p>
                            <em>
                                {isError(error) && (
                                    error.statusText
                                )}
                            </em>
                        </p>
                        <Link
                            className="btn btn-primary"
                            to='/'
                            children='Take Me Home'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function isError(error: any): error is { statusText: string } {
    return "statusText" in error;
}