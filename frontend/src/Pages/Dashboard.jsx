import { useState } from "react"
import jobs from "../mock/jobs.json"
import HeaderFilters from "../components/HeaderFilters"
import JobTable from "../components/JobTable"
import JobDetails from "../components/JobDetails"
import OperatorActions from "../components/OperatorActions"

function Dashboard() {
	const [selectedJob, setSelectedJob] = useState(null)

	return (
		<div style={{ padding: "20px" }}>
			<h1>Shop Floor Dashboard</h1>

			<HeaderFilters />

			<JobTable jobs={jobs} onSelectJob={setSelectedJob} />

			{selectedJob && (
				<>
					<JobDetails job={selectedJob} />
					<OperatorActions job={selectedJob} />
				</>
			)}
		</div>
	)
}

export default Dashboard
