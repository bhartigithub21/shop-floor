const detailFields = [
	{ label: "Production Order", key: "ProdOrderNo" },
	{ label: "Customer", key: "CustomerName" },
	{ label: "Source No", key: "SourceNo" },
	{ label: "Source Description", key: "SourceDescription" },
	{ label: "Schedule Date", key: "ScheduleDate" },
	{ label: "Next Operation", key: "NextOperationDescription" },
	{ label: "Linear Length", key: "LinearLengthMtr" },
	{ label: "Board Ups", key: "BoardUps" },
	{ label: "Planned Deckle Size", key: "PlannedDeckleSizeMm" },
	{ label: "Cut Size", key: "CutSizeMm" },
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

function JobDetails({ job }) {
	return (
		<section className='dashboard-detail-card'>
			<div className='dashboard-card-header'>
				<div>
					<p className='dashboard-section-eyebrow'>Selected Order</p>
					<h2>Job Details</h2>
				</div>
				<span className='dashboard-status-pill'>
					{job?.NextOperationDescription || "In Queue"}
				</span>
			</div>

			<div className='dashboard-job-hero'>
				<p className='dashboard-job-code'>{job?.ProdOrderNo}</p>
				<p className='dashboard-job-description'>
					{job?.SourceDescription || "No description available"}
				</p>
			</div>

			<div className='dashboard-detail-list'>
				{detailFields.map((field) => (
					<div key={field.key} className='dashboard-detail-item'>
						<span className='dashboard-detail-label'>{field.label}</span>
						<strong className='dashboard-detail-value'>
							{formatValue(job?.[field.key], field.key)}
						</strong>
					</div>
				))}
			</div>
		</section>
	)
}

export default JobDetails
