function HeaderFilters({
	searchText,
	onSearchChange,
	onRefresh,
	selectedCustomer,
	onCustomerChange,
	customerOptions,
}) {
	return (
		<section className='dashboard-filters'>
			<div className='dashboard-filter-group dashboard-filter-group-wide'>
				<label htmlFor='dashboard-search'>Quick Search</label>
				<input
					id='dashboard-search'
					className='dashboard-filter-control'
					type='text'
					placeholder='Search by order, customer, source, or description'
					value={searchText}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
			</div>

			<div className='dashboard-filter-group'>
				<label htmlFor='dashboard-customer'>Customer</label>
				<select
					id='dashboard-customer'
					className='dashboard-filter-control'
					value={selectedCustomer}
					onChange={(e) => onCustomerChange(e.target.value)}>
					<option value=''>All Customers</option>
					{customerOptions.map((customerOption) => (
						<option key={customerOption} value={customerOption}>
							{customerOption}
						</option>
					))}
				</select>
			</div>

			<div className='dashboard-filter-actions'>
				<button
					type='button'
					className='dashboard-secondary-button'
					onClick={onRefresh}>
					Reset Filters
				</button>
			</div>
		</section>
	)
}

export default HeaderFilters
