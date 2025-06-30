function Footer({activePage}){
    return (
    <nav className="footer-navigation dark-mode-bg">
    
            <ul>
            <li className={activePage == "All" ? "active-page":""}>All</li>
            <li className={activePage == "Active" ? "active-page":""}>Active</li>
            <li className={activePage == "Complete" ? "active-page":""}>Completed</li>
            </ul>

        </nav>
    )
}

export default Footer
