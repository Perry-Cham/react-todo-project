function Footer({items}){
    return (
    <nav className="Navigation">
        <div>
            <p>`{items.length} {items.length == 1 ? 'item left' : 'items left'}`</p>
            <ul>
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
            </ul>

            <button>Clear completed</button>
            </div>
        </nav>
    )
}

export default Footer
