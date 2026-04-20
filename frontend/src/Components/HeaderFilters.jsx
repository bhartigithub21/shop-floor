function HeaderFilters() {
	return (
		<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
			<input type='text' placeholder='Search Production Order' />
			<select>
				<option>All Customers</option>
				<option>Haier Appliances</option>
				<option>Whirlpool</option>
			</select>
			<select>
				<option>All Status</option>
				<option>Approved</option>
				<option>Pending</option>
			</select>
			<button>Refresh</button>
		</div>
	)
}

export default HeaderFilters
