const columns = [
	{ key: "ProdOrderNo", label: "Prod Order" },
	{ key: "CustomerName", label: "Customer Name" },
	{ key: "SourceNo", label: "Source No" },
	{ key: "SourceDescription", label: "Description" },
	{ key: "ScheduleDate", label: "Schedule Date" },
	{ key: "QuantitytoSchedule", label: "Quantity to Schedule (KG)" },
	{ key: "QuantityPer", label: "Quantity Per" },
	{ key: "OutputQuantity", label: "Output Quantity" },
	{ key: "OutPutWeight", label: "Output Weight" },
	{ key: "SourceInventory", label: "Source Inventory" },
	{ key: "NextOperationDescription", label: "Next Operation" },
	{ key: "PlannedDeckleSizeMm", label: "Planned Deckle Size (mm)" },
	{ key: "CutSizeMm", label: "Cut Size (mm)" },
	{ key: "LinearLengthMtr", label: "Linear Length (mtr)" },
	{ key: "BoardUps", label: "Board Ups" },
	{ key: "Height", label: "Height" },
	{ key: "Flap", label: "Flap" },
	{ key: "CalculatedBoardUps", label: "Calculated Board Ups" },
	{ key: "SheetQuantity", label: "Sheet Quantity" },
	{ key: "MinimumStockLevel", label: "Minimum Stock Level" },
	{ key: "ProdOrderFinishedQty", label: "Prod. Order Finished Qty" },
	{ key: "ProdOrderRemainingQty", label: "Prod. Order Remaining Qty" },
	{ key: "ConsumptionQuantity", label: "Consumption Quantity" },
	{ key: "ScrapQuantity", label: "Scrap Quantity" },
	{ key: "ScrapWeight", label: "Scrap Weight" },
	{ key: "BoardQuality", label: "Board Quality" },
	{ key: "NoofPly", label: "No. Of Ply" },
	{ key: "Flute", label: "Flute" },
	{ key: "TrimMm", label: "Trim (mm)" },
	{ key: "MinTrim", label: "Min. Trim" },
	{ key: "MinWeight", label: "Min. Weight" },
	{ key: "Plywood", label: "Plywood" },
]

const numberFormatter = new Intl.NumberFormat("en-IN", {
	maximumFractionDigits: 2,
})

function formatValue(value, key) {
	if (value === "" || value === null || value === undefined) {
		return "--"
	}

	if (typeof value === "number") {
		return numberFormatter.format(value)
	}

	if (key.toLowerCase().includes("date")) {
		const parsedDate = new Date(value)

		if (!Number.isNaN(parsedDate.getTime())) {
			return new Intl.DateTimeFormat("en-IN", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}).format(parsedDate)
		}
	}

	return value
}

function JobTable({ jobs, onSelectJob, selectedJobId }) {
	return (
		<section className='dashboard-table-card'>
			<div className='dashboard-table-header'>
				<div>
					<p className='dashboard-section-eyebrow'>Production Queue</p>
					<h2>Job Overview</h2>
				</div>
				<span className='dashboard-table-count'>{jobs.length} jobs</span>
			</div>

			<div className='dashboard-table-scroll'>
				<table className='dashboard-table'>
					<thead>
						<tr>
							{columns.map((column) => (
								<th key={column.key}>{column.label}</th>
							))}
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{jobs.length === 0 && (
							<tr>
								<td
									colSpan={columns.length + 1}
									className='dashboard-empty-state'>
									No matching jobs found.
								</td>
							</tr>
						)}

						{jobs.map((job, index) => {
							const isSelected = selectedJobId === job.documentNo

							return (
								<tr
									key={job.documentNo || index}
									className={isSelected ? "is-selected" : ""}
									onClick={() => onSelectJob(job.documentNo)}>
									{columns.map((column) => (
										<td key={column.key}>
											{formatValue(job[column.key], column.key)}
										</td>
									))}
									<td>
										<button
											type='button'
											className='dashboard-table-action'
											onClick={(event) => {
												event.stopPropagation()
												onSelectJob(job.documentNo)
											}}>
											{isSelected ? "Selected" : "View Job"}
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default JobTable
