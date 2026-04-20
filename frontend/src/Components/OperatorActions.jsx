import { useState } from "react"

function OperatorActions({ job }) {
	const [goodQty, setGoodQty] = useState("")
	const [rejectQty, setRejectQty] = useState("")
	const [remarks, setRemarks] = useState("")

	const handleSubmit = () => {
		const payload = {
			prodOrderNo: job.prodOrderNo,
			goodQty,
			rejectQty,
			remarks,
		}

		console.log(payload)
		alert("Output Submitted")
	}

	return (
		<div
			style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
			<h2>Operator Actions</h2>

			<input
				type='number'
				placeholder='Good Quantity'
				value={goodQty}
				onChange={(e) => setGoodQty(e.target.value)}
			/>

			<br />
			<br />

			<input
				type='number'
				placeholder='Reject Quantity'
				value={rejectQty}
				onChange={(e) => setRejectQty(e.target.value)}
			/>

			<br />
			<br />

			<textarea
				placeholder='Remarks'
				value={remarks}
				onChange={(e) => setRemarks(e.target.value)}
			/>

			<br />
			<br />

			<button onClick={handleSubmit}>Submit Output</button>
		</div>
	)
}

export default OperatorActions
