function JobTable({ jobs, onSelectJob }) {
	return (
		<table border='1' cellPadding='10' width='100%'>
			<thead>
				<tr>
					<th>Prod Order</th>
					<th>Customer Name</th>
					<th>Source No</th>
					<th>Description</th>
					<th>Schedule Date</th>
					<th>FPA Status</th>
					<th>Quantity to Schedule(KG)</th>
					<th>Quantity Per</th>
					<th>Output Quantity</th>
					<th>Output Weight</th>
					<th>Source Inventory</th>
					<th>Next Operation Description</th>
					<th>Planned Deckle Size(mm)</th>
					<th>Cut Size(mm)</th>
					<th>Linear Length(mtr)</th>
					<th>Board Ups</th>
					<th>Height</th>
					<th>Flap</th>
					<th>Calculated Board Ups</th>
					<th>Sheet Quantity</th>
					<th>Minimum Stock Level</th>
					<th>Prod. Order Finished Quantity</th>
					<th>Prod. Order Remaining Quantity</th>
					<th>Consumption Quantity</th>
					<th>Scrap Quantity</th>
					<th>Scrap Weight</th>
					<th>Board Quality</th>
					<th>No. Of Ply</th>
					<th>Flute</th>
					<th>Trim(mm)</th>
					<th>Min.Trim</th>
					<th>Min (Weight)</th>
					<th>plywood</th>

					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{jobs.length === 0 && (
					<tr>
						<td colSpan='34' style={{ textAlign: "center" }}>
							No matching jobs found.
						</td>
					</tr>
				)}
				{jobs.map((job, index) => (
					<tr key={index}>
						<td>{job.prodOrderNo}</td>
						<td>{job.customerName}</td>
						<td>{job.sourceNo}</td>
						<td>{job.sourceDescription}</td>
						<td>{job.scheduleDate}</td>
						<td>{job.FPAStatus}</td>
						<td>{job["quantityToSchedule(KG)"]}</td>
						<td>{job.quantityPer}</td>
						<td>{job.outputQuantity}</td>
						<td>{job.outputWeight}</td>
						<td>{job.sourceInventory}</td>
						<td>{job.NextOperationDescription}</td>
						<td>{job["plannedDecklesize(mm)"]}</td>
						<td>{job["cutSize(mm)"]}</td>
						<td>{job["linearLength(mtr)"]}</td>
						<td>{job.boardups}</td>
						<td>{job.height}</td>
						<td>{job.flap}</td>
						<td>{job.calculatedBoardUps}</td>
						<td>{job.sheetQuantity}</td>
						<td>{job.minimumStockLevel}</td>
						<td>{job.ProdOrderFinishedQuantity}</td>
						<td>{job.ProdOrderRemainingQuantity}</td>
						<td>{job.ConsumptionQuantity}</td>
						<td>{job.ScrapQuantity}</td>
						<td>{job.ScrapWeight}</td>
						<td>{job.boardQuality}</td>
						<td>{job.NoOfPly}</td>
						<td>{job.flute}</td>
						<td>{job["Trim(mm)"]}</td>
						<td>{job.MinTrim}</td>
						<td>{job["Min(Weight)"]}</td>
						<td>{job.plywood}</td>

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
