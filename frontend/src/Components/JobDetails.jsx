function JobDetails({ job }) {
	return (
		<div
			style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
			<h2>Job Details</h2>

			<p>
				<strong>Production Order:</strong> {job.prodOrderNo}
			</p>
			<p>
				<strong>Customer:</strong> {job.customerName}
			</p>
			<p>
				<strong>Source No:</strong> {job.sourceNo}
			</p>
			<p>
				<strong>Source Description:</strong> {job.sourceDescription}
			</p>
			<p>
				<strong>Linear Length:</strong> {job.linearLength}
			</p>
			<p>
				<strong>Board Ups:</strong> {job.boardUps}
			</p>
			<p>
				<strong>Planned Deckle Size:</strong> {job.plannedDeckleSize}
			</p>
			<p>
				<strong>Cut Size:</strong> {job.cutSize}
			</p>
		</div>
	)
}

export default JobDetails
