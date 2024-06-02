import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div>
                <img src="" alt="" />
            </div>
            <div className="space-y-3">
                <p>Here are some use full links</p>
                <div className="space-x-3">
                    <button className="btn bg-gradient-to-tr from-sky-500 to-sky-800" onClick={() => navigate(-1)}>Go back</button>
                    <Link to="/">
                    <button className="btn bg-gradient-to-tr from-green-800 to-green-500">Home</button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default ErrorPage;