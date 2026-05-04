import { useState } from "react"

function OutputJournal({ job }) {
	const [form, setForm] = useState({
		outputQty: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		setupTime: "",
		runTime: "",
		operator: "",
		reason: "",
	})

	const [scrapList, setScrapList] = useState([
		{ code: "", description: "", qty: "" },
	])

	const [downTimeList, setDownTimeList] = useState([
		{ date: "", start: "", end: "", category: "Breakdown", description: "" },
	])

	const handleChange = (event) => {
		setForm((currentForm) => ({
			...currentForm,
			[event.target.name]: event.target.value,
		}))
	}

	const addScrapLine = () => {
		setScrapList((currentList) => [
			...currentList,
			{ code: "", description: "", qty: "" },
		])
	}

	const updateScrap = (index, field, value) => {
		setScrapList((currentList) =>
			currentList.map((item, itemIndex) =>
				itemIndex === index ? { ...item, [field]: value } : item,
			),
		)
	}

	const addDownTime = () => {
		setDownTimeList((currentList) => [
			...currentList,
			{
				date: "",
				start: "",
				end: "",
				category: "Breakdown",
				description: "",
			},
		])
	}

	const updateDownTime = (index, field, value) => {
		setDownTimeList((currentList) =>
			currentList.map((item, itemIndex) =>
				itemIndex === index ? { ...item, [field]: value } : item,
			),
		)
	}

	const handleSubmit = () => {
		const payload = {
			documentNo: job.documentNo ?? "",
			lineNo: job.lineNo ?? "",
			productionOrderNo: job.ProdOrderNo,
			sourceNo: job.SourceNo ?? "",
			machineNo: job.No ?? "",
			...form,
			scrapList,
			downTimeList,
		}

		console.log(payload)
		alert("Output posted")
	}

	return (
		<div className='output-journal-content'>
			<section className='output-journal-summary'>
				<div className='output-journal-summary-card output-journal-summary-hero'>
					<span className='output-journal-summary-label'>Production Order</span>
					<strong className='output-journal-summary-value'>
						{job.ProdOrderNo}
					</strong>
					<p className='output-journal-summary-copy'>
						{job.SourceDescription || "No item description available"}
					</p>
				</div>

				<div className='output-journal-summary-card'>
					<span className='output-journal-summary-label'>Source No.</span>
					<strong className='output-journal-summary-value'>
						{job.SourceNo || "--"}
					</strong>
				</div>
			</section>

			<section className='output-journal-section'>
				<div className='output-journal-section-header'>
					<div>
						<p className='output-journal-section-eyebrow'>Production Entry</p>
						<h2>Output Details</h2>
					</div>
				</div>

				<div className='output-journal-grid'>
					<label className='output-journal-field output-journal-field-wide'>
						<span>Quantity Produced</span>
						<input
							type='number'
							name='outputQty'
							value={form.outputQty}
							onChange={handleChange}
							placeholder='Enter produced quantity'
						/>
					</label>

					<label className='output-journal-field'>
						<span>Start Date</span>
						<input
							type='date'
							name='startDate'
							value={form.startDate}
							onChange={handleChange}
						/>
					</label>

					<label className='output-journal-field'>
						<span>End Date</span>
						<input
							type='date'
							name='endDate'
							value={form.endDate}
							onChange={handleChange}
						/>
					</label>

					<label className='output-journal-field'>
						<span>Start Time</span>
						<input
							type='time'
							name='startTime'
							value={form.startTime}
							onChange={handleChange}
						/>
					</label>

					<label className='output-journal-field'>
						<span>End Time</span>
						<input
							type='time'
							name='endTime'
							value={form.endTime}
							onChange={handleChange}
						/>
					</label>

					<label className='output-journal-field'>
						<span>Setup Time</span>
						<input
							type='number'
							name='setupTime'
							value={form.setupTime}
							onChange={handleChange}
							placeholder='Minutes'
						/>
					</label>

					<label className='output-journal-field'>
						<span>Run Time</span>
						<input
							type='number'
							name='runTime'
							value={form.runTime}
							onChange={handleChange}
							placeholder='Minutes'
						/>
					</label>

					<label className='output-journal-field'>
						<span>Operator</span>
						<input
							type='text'
							name='operator'
							value={form.operator}
							onChange={handleChange}
							placeholder='Operator name'
						/>
					</label>

					<label className='output-journal-field'>
						<span>Reason</span>
						<select name='reason' value={form.reason} onChange={handleChange}>
							<option value=''>Select Reason</option>
							<option value='None'>None</option>
							<option value='Maintenance'>Maintenance</option>
						</select>
					</label>
				</div>
			</section>

			<section className='output-journal-section'>
				<div className='output-journal-section-header'>
					<div>
						<p className='output-journal-section-eyebrow'>Quality Tracking</p>
						<h2>Scrap / Rejection</h2>
					</div>

					<button
						type='button'
						className='output-journal-secondary-button'
						onClick={addScrapLine}>
						Add Scrap Line
					</button>
				</div>

				<div className='output-journal-stack'>
					{scrapList.map((item, index) => (
						<div key={`scrap-${index}`} className='output-journal-row-card'>
							<label className='output-journal-field'>
								<span>Scrap Code</span>
								<input
									value={item.code}
									onChange={(event) =>
										updateScrap(index, "code", event.target.value)
									}
									placeholder='Enter scrap code'
								/>
							</label>

							<label className='output-journal-field output-journal-field-wide'>
								<span>Description</span>
								<input
									value={item.description}
									onChange={(event) =>
										updateScrap(index, "description", event.target.value)
									}
									placeholder='Describe the rejection'
								/>
							</label>

							<label className='output-journal-field'>
								<span>Quantity</span>
								<input
									type='number'
									value={item.qty}
									onChange={(event) =>
										updateScrap(index, "qty", event.target.value)
									}
									placeholder='Qty'
								/>
							</label>
						</div>
					))}
				</div>
			</section>

			<section className='output-journal-section'>
				<div className='output-journal-section-header'>
					<div>
						<p className='output-journal-section-eyebrow'>Machine Tracking</p>
						<h2>Down Time</h2>
					</div>

					<button
						type='button'
						className='output-journal-secondary-button'
						onClick={addDownTime}>
						Add Down Time
					</button>
				</div>

				<div className='output-journal-stack'>
					{downTimeList.map((item, index) => (
						<div key={`down-${index}`} className='output-journal-row-card'>
							<label className='output-journal-field'>
								<span>Date</span>
								<input
									type='date'
									value={item.date}
									onChange={(event) =>
										updateDownTime(index, "date", event.target.value)
									}
								/>
							</label>

							<label className='output-journal-field'>
								<span>Start</span>
								<input
									type='time'
									value={item.start}
									onChange={(event) =>
										updateDownTime(index, "start", event.target.value)
									}
								/>
							</label>

							<label className='output-journal-field'>
								<span>End</span>
								<input
									type='time'
									value={item.end}
									onChange={(event) =>
										updateDownTime(index, "end", event.target.value)
									}
								/>
							</label>

							<label className='output-journal-field'>
								<span>Category</span>
								<select
									value={item.category}
									onChange={(event) =>
										updateDownTime(index, "category", event.target.value)
									}>
									<option value='Breakdown'>Breakdown</option>
									<option value='Maintenance'>Maintenance</option>
								</select>
							</label>

							<label className='output-journal-field output-journal-field-wide'>
								<span>Description</span>
								<input
									value={item.description}
									onChange={(event) =>
										updateDownTime(index, "description", event.target.value)
									}
									placeholder='Describe the issue'
								/>
							</label>
						</div>
					))}
				</div>
			</section>

			<div className='output-journal-actions'>
				<button
					type='button'
					className='output-journal-primary-button'
					onClick={handleSubmit}>
					Post Output
				</button>
			</div>
		</div>
	)
}

export default OutputJournal
