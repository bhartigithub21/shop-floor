function JobTable({ jobs, onSelectJob }) {
	return (
		<table border='1' cellPadding='10' width='100%'>
			<thead>
				<tr>
					<th>Prod Order</th>
					<th>Customer</th>
					<th>Source No</th>
					<th>Description</th>
					<th>Schedule Date</th>
					<th>Qty</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{jobs.map((job, index) => (
					<tr key={index}>
						<td>{job.prodOrderNo}</td>
						<td>{job.customerName}</td>
						<td>{job.sourceNo}</td>
						<td>{job.sourceDescription}</td>
						<td>{job.scheduleDate}</td>
						<td>{job.quantityToSchedule}</td>
						<td>{job.status}</td>
						<td>
							<button onClick={() => onSelectJob(job)}>Open</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default JobTable
