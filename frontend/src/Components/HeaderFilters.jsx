function HeaderFilters({
	searchText,
	onSearchChange,
	onRefresh,
	Customers,
	setCustomers,
}) {
	return (
		<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
			<input
				type='text'
				placeholder='Search by order, customer, source'
				value={searchText}
				onChange={(e) => onSearchChange(e.target.value)}
			/>
			<select value={Customers} onChange={(e) => setCustomers(e.target.value)}>
				<option>All Customers</option>
				<option>Haier Appliances</option>
				<option>Whirlpool</option>
			</select>
			<select>
				<option>All Status</option>
				<option>Approved</option>
				<option>Pending</option>
			</select>
			<button onClick={onRefresh}>Refresh</button>
		</div>
	)
}

export default HeaderFilters
