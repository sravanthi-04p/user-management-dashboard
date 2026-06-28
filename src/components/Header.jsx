const Header=({onAddClick})=>{
    return(
        <header className="header">
            <div className="header-brand">
                <h1>USER Management</h1>
                <span className="header-subtitle">Admin DashBoard</span>
            </div>
            <button className="btn btn-primary" onClick={onAddClick}> + ADD uSER</button>
        </header>
    );
};
export default Header